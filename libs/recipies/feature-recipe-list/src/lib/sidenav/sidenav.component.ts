import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  getIsStateValid,
  getRecipiesBySearchPhrase,
  loadRecipies,
  RecipiesDataAccessRecipesModule,
  RecipiesEntity,
  RecipiesState,
  setSearchPhrase,
} from '@cook-it/recipies/data-access-recipes';
import {
  distinctUntilChanged,
  map,
  Observable,
  tap,
  withLatestFrom,
} from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import {
  AddRecipeButtonComponent,
  RecipiesUiRecipiesSidebarModule,
  SearchBarComponent,
} from '@cook-it/recipies/ui-recipies-sidebar';
import {
  RecipeDetailsComponent,
  RecipiesFeatureRecipeDetailsModule,
} from '@cook-it/recipies/feature-recipe-details';
import {
  RecipeAddComponent,
  RecipiesFeatureAddRecipeModule,
} from '@cook-it/recipies/feature-add-recipe';
import { EditRecipeComponent } from '@cook-it/recipies/feature-edit-recipe';
import { FormGuard } from '../guard/form/form.guard';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  DarkModeState,
  RecipiesDataAccessDarkModeModule,
  setDarkMode,
  setLightMode,
} from '@cook-it/recipies/data-access-dark-mode';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'cook-it-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  isValid$: Observable<boolean> = this.store.select(getIsStateValid);
  recipies$: Observable<RecipiesEntity[]> = this.store
    .select(getRecipiesBySearchPhrase)
    .pipe(
      withLatestFrom(this.isValid$),
      tap(([, isValid]) => {
        if (!isValid) {
          this.store.dispatch(loadRecipies());
        }
      }),
      map(([recipes]) => recipes)
    );

  @ViewChild('drawer') drawer!: MatDrawer;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      distinctUntilChanged(),
      map((result: BreakpointState) => result.matches)
    );

  darkModeLocalStorageValue: string | null = localStorage.getItem('darkMode');
  isInitWithDarkMode =
    typeof this.darkModeLocalStorageValue === 'string'
      ? (JSON.parse(this.darkModeLocalStorageValue) as boolean)
      : false;
  toggleControl = new FormControl(this.isInitWithDarkMode);

  constructor(
    private store: Store<RecipiesState | DarkModeState>,
    private breakpointObserver: BreakpointObserver
  ) {}

  closeSideNav() {
    if (this.drawer.mode === 'over') {
      this.drawer.close();
    }
  }

  toggleDarkTheme(checked: boolean) {
    checked
      ? this.store.dispatch(setDarkMode())
      : this.store.dispatch(setLightMode());
  }

  handleTypingPhrase(phrase: string) {
    this.store.dispatch(setSearchPhrase({ searchPhrase: phrase }));
  }
}

const materialModules = [
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSlideToggleModule,
];

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
    RecipiesDataAccessRecipesModule,
    RecipiesUiRecipiesSidebarModule,
    RecipiesFeatureRecipeDetailsModule,
    RecipiesFeatureAddRecipeModule,
    AddRecipeButtonComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    RecipiesDataAccessDarkModeModule,
    ScrollingModule,
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent]
})
export class SidenavComponentModule {}
