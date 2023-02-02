import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { TopBarComponent } from '@cook-it/recipies/ui-top-bar';

@NgModule({
  imports: [CommonModule, RecipeDetailsComponent, TopBarComponent],
  exports: [RecipeDetailsComponent],
})
export class RecipiesFeatureRecipeDetailsModule {}
