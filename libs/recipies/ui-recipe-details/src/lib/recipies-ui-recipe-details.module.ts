import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeOverviewComponent } from './recipe-overview/recipe-overview.component';

@NgModule({
  imports: [CommonModule, RecipeOverviewComponent],
  exports: [RecipeOverviewComponent]
})
export class RecipiesUiRecipeDetailsModule {}
