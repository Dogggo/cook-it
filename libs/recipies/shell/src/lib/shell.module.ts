import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { RecipiesFeatureRecipeDetailsModule } from '@cook-it/recipies/feature-recipe-details';
import * as recipeDetailsComponent from 'libs/recipies/feature-recipe-details/src/lib/recipe-details/recipe-details.component';

export const shellRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'recipes-list',
    pathMatch: 'full',
  },
  {
    path: 'recipe-list',
    loadChildren: () =>
      import('@cook-it/recipies/feature-recipe-list').then(
        (m) => m.SidenavComponentModule
      ),
  },

  // {
  //   path: 'recipe-list2',
  //   outlet: 'details',
  //   loadChildren: () =>
  //     import('@cook-it/recipies/feature-recipe-details').then(
  //       (m) => m.RecipiesFeatureRecipeDetailsModule
  //     ),
  // },
  // {
  //   path: 'recipe-list2',
  //   outlet: 'details',
  //   component: recipeDetailsComponent.RecipeDetailsComponent
  // },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(shellRoutes),
    RecipiesFeatureRecipeDetailsModule,
  ],
})
export class ShellModule {}
