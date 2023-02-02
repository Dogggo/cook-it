import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { MatInputModule } from '@angular/material/input';

const materialModules = [MatInputModule];

@NgModule({
  imports: [
    CommonModule,
    IngredientFormComponent,
    RecipeFormComponent,
    ...materialModules,
  ],
  exports: [IngredientFormComponent, RecipeFormComponent],
})
export class RecipiesUiRecipeFormModule {}
