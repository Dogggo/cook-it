import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeAddComponent } from '@cook-it/recipies/feature-add-recipe';
import { EditRecipeComponent } from '@cook-it/recipies/feature-edit-recipe';

@Injectable({
  providedIn: 'root',
})
export class FormGuard
  implements CanDeactivate<RecipeAddComponent | EditRecipeComponent>
{
  canDeactivate(
    component: RecipeAddComponent | EditRecipeComponent
  ): Observable<boolean> | boolean {
    if (
      component.form?.dirty &&
      component.formServiceState.shouldTriggerDeactivateFormGuard
    ) {
      return component.disardChanges();
    }
    return true;
  }
}
