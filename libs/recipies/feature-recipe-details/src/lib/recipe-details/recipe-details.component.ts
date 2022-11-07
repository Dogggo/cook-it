import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  getSelected,
  RecipiesEntity,
  RecipiesState,
  selectRecipe,
} from '@cook-it/recipies/data-access';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { RecipiesUiRecipeDetailsModule } from '@cook-it/recipies/ui-recipe-details';
import { RecipiesUiTopBarModule } from '@cook-it/recipies/ui-top-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'cook-it-recipe-details',
  standalone: true,
  imports: [
    CommonModule,
    RecipiesUiRecipeDetailsModule,
    RecipiesUiTopBarModule,
  ],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

@UntilDestroy()
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipe$!: Observable<RecipiesEntity | undefined>;

  routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<RecipiesState>
  ) {}

  ngOnInit(): void {
    this.changeSelectedRecipe();
  }

  changeSelectedRecipe() {
    this.routeSub = this.route.params
    .pipe(
      untilDestroyed(this),
      distinctUntilChanged())
    .subscribe((param) => {
      this.store.dispatch(selectRecipe({selectedId: param['id']}));
      this.recipe$ = this.store.select(getSelected);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
