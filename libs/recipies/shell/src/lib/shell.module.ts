import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { RecipiesFeatureRecipeDetailsModule } from '@cook-it/recipies/feature-recipe-details';

export const shellRoutes: Route[] = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('@cook-it/recipies/feature-recipe-list').then(
        (m) => m.SidenavComponentModule
      ),
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(shellRoutes),
    RecipiesFeatureRecipeDetailsModule,
  ],
})
export class ShellModule {}
