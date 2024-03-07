import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormState,
  FormValidator,
  IngredientFormComponent,
  RecipeFormComponent,
} from '@cook-it/recipies/ui-recipe-form';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {
  checkIfNameExists,
  RecipiesDataAccessRecipesModule,
  RecipiesState,
  saveRecipe,
} from '@cook-it/recipies/data-access-recipes';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  ModalInterface,
  RecipiesUiModalComponent,
} from '@cook-it/recipies/ui-modal';
import { FormatTimePipe } from '@cook-it/recipies/utils-pipes';

const materialModules = [MatButtonModule];

@Component({
  selector: 'cook-it-recipe-add',
  standalone: true,
  imports: [
    CommonModule,
    IngredientFormComponent,
    RecipeFormComponent,
    ...materialModules,
    ReactiveFormsModule,
    RecipiesDataAccessRecipesModule,
    FormatTimePipe,
  ],
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormState],
})
export class RecipeAddComponent implements OnInit {
  modalRef!: MatDialogRef<RecipiesUiModalComponent>;

  constructor(
    private store: Store<RecipiesState>,
    public dialog: MatDialog,
    private formState: FormState
  ) {}

  ngOnInit(): void {
    this._initSetAmountOfIngredientsInForm(2);
    this._initSetAsyncValidators();
  }

  get ingredients() {
    return this.formState.form.controls.ingredients;
  }

  get name() {
    return this.formState.form.controls.name;
  }

  get form() {
    return this.formState.form;
  }

  get formServiceState() {
    return this.formState;
  }

  addIngredient() {
    this.formState.addIngredient();
  }

  saveRecipe() {
    this.formState.form.markAsPristine();
    this.store.dispatch(
      saveRecipe({
        payload: { ...this.form.getRawValue() },
      })
    );
  }

  deleteIngredient(index: number) {
    this.formState.ingredients.removeAt(index);
  }

  disardChanges(): Observable<boolean> {
    const modalInterface: ModalInterface = {
      modalHeader: 'Unsaved changes',
      modalContent:
        'You have unsaved changes. Are you sure you want to discard them?',
      cancelButtonLabel: 'Discard changes',
      confirmButtonLabel: 'Continue editing',
      callbackMethod: () => {
        this.continueEditing();
      },
    };

    this.modalRef = this.dialog.open(RecipiesUiModalComponent, {
      width: '400px',
      data: modalInterface,
    });

    return this.modalRef.afterClosed();
  }

  private _initSetAmountOfIngredientsInForm(ingredientsAmount: number) {
    for (let ing = 0; ing < ingredientsAmount; ing++) {
      this.formState.addIngredient();
    }
  }

  private _initSetAsyncValidators() {
    this.name.setAsyncValidators([
      FormValidator.uniqueNameRequired((currentName: string) =>
        this.store.select(checkIfNameExists(currentName, []))
      ),
    ]);
    this.formState.form.updateValueAndValidity();
  }

  private continueEditing() {
    this.modalRef.close(false);
  }
}
