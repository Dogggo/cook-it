import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import * as recipeAddComponent from 'libs/recipies/feature-add-recipe/src/lib/recipe-add/recipe-add.component';
import * as editRecipeComponent from 'libs/recipies/feature-edit-recipe/src/lib/edit-recipe/edit-recipe.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormGuard
  implements
    CanDeactivate<
      | recipeAddComponent.RecipeAddComponent
      | editRecipeComponent.EditRecipeComponent
    >
{
  constructor() {}

  canDeactivate(
    component:
      | recipeAddComponent.RecipeAddComponent
      | editRecipeComponent.EditRecipeComponent
  ): Observable<boolean> | boolean {
    if (component.form?.dirty && component.formServiceState.triggerGuard) {
      return component.disardChanges();
    }
    return true;
  }
}
