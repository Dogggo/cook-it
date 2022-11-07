import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {
  deleteRecipe,
  editRecipe,
  getSelected,
  RecipiesDataAccessModule,
  RecipiesEntity,
  RecipiesState,
  selectRecipe,
} from '@cook-it/recipies/data-access';
import { RecipiesSharedModule } from '@cook-it/recipies/shared';
import {
  IngredientFormComponent,
  RecipeFormComponent,
} from '@cook-it/recipies/ui-recipe-form';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as modalComponent from 'libs/recipies/shared/src/lib/modal/modal.component';
import * as modalInterface from 'libs/recipies/shared/src/lib/modal/modal.interface';
import { first, Observable, Subscription, take } from 'rxjs';
import { TopBarComponent } from '@cook-it/recipies/ui-top-bar';
import { FormState } from 'libs/recipies/ui-recipe-form/src/lib/form.state';
import { ActivatedRoute } from '@angular/router';
import { ModalInterface } from 'libs/recipies/shared/src/lib/modal/modal.interface';

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
    RecipiesDataAccessModule,
    RecipiesSharedModule,
    TopBarComponent,
  ],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormState],
})
export class EditRecipeComponent implements OnInit, OnDestroy {
  modalRef!: MatDialogRef<modalComponent.ModalComponent>;

  recipeOnStart!: RecipiesEntity;

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
    this.store.dispatch(selectRecipe(this.recipeId));
    this.setRecipeOnStart();
    this.formSub = this.formState.form.valueChanges.subscribe(() => this.formState.triggerGuard = true)
  }

  setRecipeOnStart() {
    this.recipe$.pipe(first()).subscribe((recipe) => {
      this.recipeOnStart = recipe!;
      this.formState.setForm(recipe!);
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
    this.store.dispatch(editRecipe(this.form.value, this.recipeId));
  }

  deleteIngredient(index: number) {
    this.formState.ingredients.removeAt(index);
    this.formState.form.markAsDirty();
  }

  undoChanges() {
    this.formState.setForm(this.recipeOnStart);
    this.formState.triggerGuard = false;
  }

  disardChanges(): Observable<boolean> {
    const modalInterface: modalInterface.ModalInterface = {
      modalHeader: 'Unsaved changes',
      modalContent:
        'You have unsaved changes. Are you sure you want to discard them?',
      cancelButtonLabel: 'Discard changes',
      confirmButtonLabel: 'Continue editing',
      callbackMethod: () => {
        this.continueEditing();
      },
    };

    this.modalRef = this.dialog.open(modalComponent.ModalComponent, {
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

  private deleteRecipeConfirmation(id: string) {
    const modalInterface: ModalInterface = {
      modalHeader: `Delete recipe: "${this.recipeOnStart?.name}"?`,
      modalContent: 'This operation cannot be undone!',
      cancelButtonLabel: 'Cancel',
      confirmButtonLabel: 'Delete',
      callbackMethod: () => {
        this.store.dispatch(deleteRecipe(id)),
        this.modalRef.close(false);
      },
    };

    this.modalRef = this.dialog.open(modalComponent.ModalComponent, {
      width: '400px',
      data: modalInterface,
    });

    return this.modalRef.afterClosed();
  }
  
  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }
}
