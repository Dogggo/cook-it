import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { AddRecipeButtonComponent } from './add-recipe-button/add-recipe-button.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  imports: [
    CommonModule,
    RecipeItemComponent,
    AddRecipeButtonComponent,
    SearchBarComponent,
  ],
  exports: [RecipeItemComponent, AddRecipeButtonComponent, SearchBarComponent],
})
export class RecipiesUiRecipiesSidebarModule {}
