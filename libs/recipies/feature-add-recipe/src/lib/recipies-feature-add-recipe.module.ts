import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';

@NgModule({
  imports: [CommonModule, RecipeAddComponent],
  exports: [RecipeAddComponent]
})
export class RecipiesFeatureAddRecipeModule {}
