import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import * as recipeAddComponent from 'libs/recipies/feature-add-recipe/src/lib/recipe-add/recipe-add.component';
import * as editRecipeComponent from 'libs/recipies/feature-edit-recipe/src/lib/edit-recipe/edit-recipe.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanDeactivate<unknown> {
  constructor(public dialog: MatDialog) {}

  canDeactivate(
    component:
      | recipeAddComponent.RecipeAddComponent
      | editRecipeComponent.EditRecipeComponent
  ): Observable<boolean> {
    if (component.form?.dirty && component.formServiceState.triggerGuard) {
      return component.disardChanges();
    }
    return of(true);
  }
}
