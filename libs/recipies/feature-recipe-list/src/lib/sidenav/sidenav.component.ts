import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

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
import { Route, Router, RouterModule } from '@angular/router';
import { RecipiesUiRecipiesSidebarModule } from '@cook-it/recipies/ui-recipies-sidebar';
import { RecipiesFeatureRecipeDetailsModule } from '@cook-it/recipies/feature-recipe-details';
import * as recipeDetailsComponent from 'libs/recipies/feature-recipe-details/src/lib/recipe-details/recipe-details.component';

@Component({
  selector: 'cook-it-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  recipies$: Observable<RecipiesEntity[]> =
    this.store.select<RecipiesEntity[]>(getAllRecipies);

  constructor(private store: Store<RecipiesState>, private router: Router) {}
}

const materialModules = [MatSidenavModule, MatListModule];

const routes: Route[] = [
  { 
    path: '',
    component: SidenavComponent ,
    children: [
      {
        path: ':id', component: recipeDetailsComponent.RecipeDetailsComponent 
      }
    ]
  }
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
    RecipiesFeatureRecipeDetailsModule
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
})
export class SidenavComponentModule {}
