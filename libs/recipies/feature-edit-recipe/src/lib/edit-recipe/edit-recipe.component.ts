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
import { RecipiesUtilsPipesModule } from '@cook-it/recipies/utils-pipes';
import {
  FormValidator,
  IngredientFormComponent,
  RecipeFormComponent,
} from '@cook-it/recipies/ui-recipe-form';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription, takeWhile } from 'rxjs';
import { TopBarComponent } from '@cook-it/recipies/ui-top-bar';
import { FormState } from '@cook-it/recipies/ui-recipe-form';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { RecipiesOverview } from '@cook-it/recipies/ui-recipe-details';
import {
  ModalInterface,
  RecipiesUiModalComponent,
} from '@cook-it/recipies/ui-modal';

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
    RecipiesUtilsPipesModule,
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
    this.setRecipeOnStart();
    this.formSub = this.formState.form.valueChanges
      .pipe()
      .subscribe(() => (this.formState.triggerGuard = true));
  }

  setRecipeOnStart() {
    this.recipe$
      .pipe(takeWhile((recipe) => recipe == undefined, true))
      .subscribe((recipe) => {
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
        this.continueEditing();
      },
    };

    this.modalRef = this.dialog.open(RecipiesUiModalComponent, {
      width: '400px',
      data: modalInterface,
    });

    return this.modalRef.afterClosed();
  }

  private continueEditing() {
    this.modalRef.close(false);
  }

  handleOnDelete(id: string) {
    this.deleteRecipeConfirmation(id);
  }

  private deleteRecipeConfirmation(_id: string) {
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
}
