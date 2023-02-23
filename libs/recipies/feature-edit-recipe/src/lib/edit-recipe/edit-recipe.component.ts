import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {
  checkIfNameExists,
  deleteRecipe,
  editRecipe,
  getSelected,
  RecipiesDataAccessRecipesModule,
  RecipiesState,
} from '@cook-it/recipies/data-access-recipes';
import {
  FormState,
  FormValidator,
  IngredientFormComponent,
  RecipeFormComponent,
} from '@cook-it/recipies/ui-recipe-form';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TopBarComponent } from '@cook-it/recipies/ui-top-bar';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RecipiesOverview } from '@cook-it/recipies/ui-recipe-details';
import {
  ModalInterface,
  RecipiesUiModalComponent,
} from '@cook-it/recipies/ui-modal';
import { FormatTimePipe } from '@cook-it/recipies/utils-pipes';

const materialModules = [MatButtonModule];

@Component({
  selector: 'cook-it-edit-recipe',
  standalone: true,
  imports: [
    CommonModule,
    IngredientFormComponent,
    RecipeFormComponent,
    ...materialModules,
    ReactiveFormsModule,
    RecipiesDataAccessRecipesModule,
    FormatTimePipe,
    TopBarComponent,
  ],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormState],
})
@UntilDestroy()
export class EditRecipeComponent implements OnInit {
  modalRef!: MatDialogRef<RecipiesUiModalComponent>;

  recipeOnStart?: RecipiesOverview;

  recipe$ = this.store.select(getSelected);

  recipeId = this.route.snapshot.params['id'];

  formSub!: Subscription;

  constructor(
    private store: Store<RecipiesState>,
    public dialog: MatDialog,
    private formState: FormState,
    private route: ActivatedRoute
  ) {}

  get ingredients() {
    return this.formState.form.controls.ingredients;
  }

  get form() {
    return this.formState.form;
  }

  get name() {
    return this.formState.form.controls.name;
  }

  get formServiceState() {
    return this.formState;
  }

  ngOnInit(): void {
    this._initSetRecipeOnStart();
    this._initListenToFormChanges();
  }

  addIngredient() {
    this.formState.addIngredient();
  }

  saveRecipe() {
    this.formState.triggerGuard = false;
    this.formState.form.markAsPristine();
    this.store.dispatch(
      editRecipe({
        payload: { ...this.form.getRawValue() },
        id: this.recipeId,
      })
    );
  }

  deleteIngredient(index: number) {
    this.formState.ingredients.removeAt(index);
    this.formState.form.markAsDirty();
  }

  undoChanges() {
    if (this.recipeOnStart) {
      this.formState.setForm(this.recipeOnStart);
      this.formState.triggerGuard = false;
    }
  }

  disardChanges(): Observable<boolean> {
    const modalInterface: ModalInterface = {
      modalHeader: 'Unsaved changes',
      modalContent:
        'You have unsaved changes. Are you sure you want to discard them?',
      cancelButtonLabel: 'Discard changes',
      confirmButtonLabel: 'Continue editing',
      callbackMethod: () => {
        this._continueEditing();
      },
    };

    this.modalRef = this.dialog.open(RecipiesUiModalComponent, {
      width: '400px',
      data: modalInterface,
    });

    return this.modalRef.afterClosed();
  }

  handleOnDelete(id: string) {
    this._deleteRecipeConfirmation(id);
  }

  private _continueEditing() {
    this.modalRef.close(false);
  }

  private _deleteRecipeConfirmation(_id: string) {
    const modalInterface: ModalInterface = {
      modalHeader: `Delete recipe: "${this.recipeOnStart?.name}"?`,
      modalContent: 'This operation cannot be undone!',
      cancelButtonLabel: 'Cancel',
      confirmButtonLabel: 'Delete',
      callbackMethod: () => {
        this.store.dispatch(deleteRecipe({ _id }));
        this.modalRef.close(false);
      },
    };

    this.modalRef = this.dialog.open(RecipiesUiModalComponent, {
      width: '400px',
      data: modalInterface,
    });

    return this.modalRef.afterClosed();
  }

  private _initSetRecipeOnStart() {
    this.recipe$.pipe(untilDestroyed(this)).subscribe((recipe) => {
      this.recipeOnStart = recipe;
      if (recipe != undefined) {
        this.formState.setForm(recipe);
        this.name.setAsyncValidators([
          FormValidator.uniqueNameRequired((currentName: string) =>
            this.store.select(checkIfNameExists(currentName, [recipe.name]))
          ),
        ]);
        this.form.updateValueAndValidity();
      }
      recipe?.ingredients.forEach((ingredient) =>
        this.formState.addIngredient(ingredient)
      );
    });
  }

  private _initListenToFormChanges() {
    this.formSub = this.formState.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => (this.formState.triggerGuard = true));
  }
}
