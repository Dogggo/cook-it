import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  getSelected,
  RecipiesState,
  selectRecipe,
} from '@cook-it/recipies/data-access';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Subscription } from 'rxjs';
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
export class RecipeDetailsComponent implements OnInit {
  recipe$ = this.store.select(getSelected);

  routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<RecipiesState>
  ) {}

  ngOnInit(): void {
    this.changeSelectedRecipe();
  }

  private changeSelectedRecipe() {
    this.routeSub = this.route.params
      .pipe(distinctUntilChanged(), untilDestroyed(this))
      .subscribe((param) => {
        this.store.dispatch(selectRecipe({ selectedId: param['id'] }));
      });
  }
}
