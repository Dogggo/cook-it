import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
import { RecipiesUtilsPipesModule } from '@cook-it/recipies/utils-pipes';
import { Observable, Subscription } from 'rxjs';
import {
  ModalInterface,
  RecipiesUiModalComponent,
} from '@cook-it/recipies/ui-modal';

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
    RecipiesUtilsPipesModule,
  ],
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormState],
})
export class RecipeAddComponent implements OnInit, OnDestroy {
  modalRef!: MatDialogRef<RecipiesUiModalComponent>;

  formSub!: Subscription;

  constructor(
    private store: Store<RecipiesState>,
    public dialog: MatDialog,
    private formState: FormState
  ) {}

  ngOnInit(): void {
    this._initSetAmountOfIngredientsInForm(2);
    this._initSetAsyncValidators();
    this._initListenToFormChanges();
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
    this.store.dispatch(
      saveRecipe({
        payload: { ...this.form.getRawValue() },
      })
    );
    this.formState.triggerGuard = false;
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

  private _initListenToFormChanges() {
    this.formSub = this.formState.form.valueChanges.subscribe(
      () => (this.formState.triggerGuard = true)
    );
  }
  private continueEditing() {
    this.modalRef.close(false);
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }
}
