import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  deleteRecipe,
  getSelected,
  RecipiesEntity,
  RecipiesState,
  selectRecipe,
} from '@cook-it/recipies/data-access';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { RecipiesUiRecipeDetailsModule } from '@cook-it/recipies/ui-recipe-details';
import { RecipiesUiTopBarModule } from '@cook-it/recipies/ui-top-bar';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UntilDestroy } from '@ngneat/until-destroy';
import * as modalComponent from 'libs/recipies/shared/src/lib/modal/modal.component';
import { ModalInterface } from 'libs/recipies/shared/src/lib/modal/modal.interface';

@Component({
  selector: 'cook-it-recipe-details',
  standalone: true,
  imports: [
    CommonModule,
    RecipiesUiRecipeDetailsModule,
    RecipiesUiTopBarModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  modalRef!: MatDialogRef<modalComponent.ModalComponent>;

  recipe$ = this.store.select(getSelected);

  routeSub!: Subscription;

  recipe?: RecipiesEntity;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store<RecipiesState>
  ) {}

  ngOnInit(): void {
    this.changeSelectedRecipe();
  }

  changeSelectedRecipe() {
    this.routeSub = this.route.params
      .pipe(distinctUntilChanged())
      .subscribe((param) => {
        this.store.dispatch(selectRecipe({ selectedId: param['id'] }));
      });
  }

  public handleOnDelete(id: string) {
    this.deleteRecipeConfirmation(id);
  }

  private deleteRecipeConfirmation(_id: string) {
    const modalInterface: ModalInterface = {
      modalHeader: `Delete recipe: "${this.recipe?.name}"?`,
      modalContent: 'This operation cannot be undone!',
      cancelButtonLabel: 'Cancel',
      confirmButtonLabel: 'Delete',
      callbackMethod: () => {
        this.store.dispatch(deleteRecipe({_id})), this.modalRef.close(false);
      },
    };

    this.modalRef = this.dialog.open(modalComponent.ModalComponent, {
      width: '400px',
      data: modalInterface,
    });

    return this.modalRef.afterClosed();
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
