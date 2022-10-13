import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

@NgModule({
  imports: [CommonModule, EditRecipeComponent],
  exports: [EditRecipeComponent]
})
export class RecipiesFeatureEditRecipeModule {}
