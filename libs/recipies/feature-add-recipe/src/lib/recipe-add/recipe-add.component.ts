import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IngredientFormComponent,
  RecipeFormComponent,
} from '@cook-it/recipies/ui-recipe-form';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {
  RecipiesDataAccessModule,
  RecipiesState,
  saveRecipe,
} from '@cook-it/recipies/data-access';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipiesSharedModule } from '@cook-it/recipies/shared';
import * as modalInterface from 'libs/recipies/shared/src/lib/modal/modal.interface';
import * as modalComponent from 'libs/recipies/shared/src/lib/modal/modal.component';
import { Observable, Subscription } from 'rxjs';
import { FormState } from 'libs/recipies/ui-recipe-form/src/lib/form.state';

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
    RecipiesDataAccessModule,
    RecipiesSharedModule,
  ],
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormState],
})
export class RecipeAddComponent implements OnInit, OnDestroy {
  modalRef!: MatDialogRef<modalComponent.ModalComponent>;

  formSub!: Subscription;

  constructor(
    private store: Store<RecipiesState>,
    public dialog: MatDialog,
    private formState: FormState
  ) {}

  ngOnInit(): void {
    this.formState.addIngredient();
    this.formState.addIngredient();
    this.formSub = this.formState.form.valueChanges.subscribe(
      () => (this.formState.triggerGuard = true)
    );
  }

  get ingredients() {
    return this.formState.form.controls.ingredients;
  }

  get form() {
    return this.formState.form;
  }

  get formServiceState() {
    return this.formState;
  }

  public addIngredient() {
    this.formState.addIngredient();
  }

  public saveRecipe() {
    this.store.dispatch(saveRecipe({ payload: this.form.value }));
    this.formState.triggerGuard = false;
  }

  public deleteIngredient(index: number) {
    this.formState.ingredients.removeAt(index);
  }

  public disardChanges(): Observable<boolean> {
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

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }
}
