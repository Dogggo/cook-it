import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  RecipiesState,
  RecipiesEntity,
  getAllRecipies,
  RecipiesDataAccessModule,
} from '@cook-it/recipies/data-access';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { RecipiesUiRecipiesSidebarModule } from '@cook-it/recipies/ui-recipies-sidebar';
import { RecipiesFeatureRecipeDetailsModule } from '@cook-it/recipies/feature-recipe-details';
import * as recipeDetailsComponent from 'libs/recipies/feature-recipe-details/src/lib/recipe-details/recipe-details.component';
import { RecipiesFeatureAddRecipeModule } from '@cook-it/recipies/feature-add-recipe';
import { RecipeAddComponent } from 'libs/recipies/feature-add-recipe/src/lib/recipe-add/recipe-add.component';
import { EditRecipeComponent } from 'libs/recipies/feature-edit-recipe/src/lib/edit-recipe/edit-recipe.component';
import { AddRecipeButtonComponent } from 'libs/recipies/ui-recipies-sidebar/src/lib/add-recipe-button/add-recipe-button.component';
import { SearchBarComponent } from 'libs/recipies/ui-recipies-sidebar/src/lib/search-bar/search-bar.component';
import { FormGuard } from '../guard/form/form.guard';
import { RecipesGuard } from '../guard/recipes/recipes.guard';

@Component({
  selector: 'cook-it-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  recipies$: Observable<RecipiesEntity[]> =
    this.store.select<RecipiesEntity[]>(getAllRecipies);

  constructor(private store: Store<RecipiesState>) {}
}

const materialModules = [MatSidenavModule, MatListModule, MatToolbarModule];

const routes: Route[] = [
  {
    path: 'recipe-list',
    component: SidenavComponent,
    children: [
      {
        path: 'add',
        canDeactivate: [FormGuard],
        component: RecipeAddComponent,
      },
      {
        path: ':id',
        component: recipeDetailsComponent.RecipeDetailsComponent,
      },
      {
        path: ':id/edit',
        canDeactivate: [FormGuard],
        canActivate: [RecipesGuard],
        component: EditRecipeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules,
    HttpClientModule,
    RouterModule.forChild(routes),
    RecipiesDataAccessModule,
    RecipiesUiRecipiesSidebarModule,
    RecipiesFeatureRecipeDetailsModule,
    RecipiesFeatureAddRecipeModule,
    AddRecipeButtonComponent,
    SearchBarComponent,
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
  providers: [FormGuard, RecipesGuard],
})
export class SidenavComponentModule {}
