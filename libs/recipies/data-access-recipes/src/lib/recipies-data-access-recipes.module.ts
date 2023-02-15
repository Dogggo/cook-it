import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRecipies from './+state/recipies.reducer';
import { RecipiesEffects } from './+state/recipies.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromRecipies.RECIPIES_FEATURE_KEY,
      fromRecipies.recipiesReducer
    ),
    EffectsModule.forFeature([RecipiesEffects]),
  ],
})
export class RecipiesDataAccessRecipesModule {}
