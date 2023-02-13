import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

import {ChangeDetectionStrategy, Component, NgModule, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import {
  RecipiesState,
  RecipiesEntity,
  getAllRecipies,
  RecipiesDataAccessModule,
} from '@cook-it/recipies/data-access';
import {distinctUntilChanged, map, Observable} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
import {Route, RouterModule} from '@angular/router';
import {RecipiesUiRecipiesSidebarModule} from '@cook-it/recipies/ui-recipies-sidebar';
import {RecipiesFeatureRecipeDetailsModule} from '@cook-it/recipies/feature-recipe-details';
import {RecipiesFeatureAddRecipeModule} from '@cook-it/recipies/feature-add-recipe';
import {RecipeDetailsComponent} from '@cook-it/recipies/feature-recipe-details';
import {RecipeAddComponent} from 'libs/recipies/feature-add-recipe/src/lib/recipe-add/recipe-add.component';
import {EditRecipeComponent} from 'libs/recipies/feature-edit-recipe/src/lib/edit-recipe/edit-recipe.component';
import {
  AddRecipeButtonComponent
} from 'libs/recipies/ui-recipies-sidebar/src/lib/add-recipe-button/add-recipe-button.component';
import {SearchBarComponent} from 'libs/recipies/ui-recipies-sidebar/src/lib/search-bar/search-bar.component';
import {FormGuard} from '../guard/form/form.guard';
import {RecipesGuard} from '../guard/recipes/recipes.guard';
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'cook-it-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  recipies$: Observable<RecipiesEntity[]> =
    this.store.select<RecipiesEntity[]>(getAllRecipies);

  @ViewChild('drawer') drawer: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      distinctUntilChanged(),
      map((result: BreakpointState) => result.matches));

  constructor(private store: Store<RecipiesState>, private breakpointObserver: BreakpointObserver) {
  }

  closeSideNav() {
    if (this.drawer._mode == 'over') {
      this.drawer.close();
    }
  }
}

const materialModules = [MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule];

const routes: Route[] = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'add',
        canDeactivate: [FormGuard],
        component: RecipeAddComponent,
      },
      {
        path: ':id',
        component: RecipeDetailsComponent,
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
export class SidenavComponentModule {
}
