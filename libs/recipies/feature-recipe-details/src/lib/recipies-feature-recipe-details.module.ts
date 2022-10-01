import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

@NgModule({
  imports: [CommonModule, RecipeDetailsComponent],
  exports: [RecipeDetailsComponent]
})
export class RecipiesFeatureRecipeDetailsModule {}
