import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromDarkMode from './+state/dark-mode.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DarkModeEffects } from './+state/dark-mode.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDarkMode.DARK_MODE_FEATURE_KEY,
      fromDarkMode.darkModeReducer
    ),
    EffectsModule.forFeature([DarkModeEffects]),
  ],
})
export class RecipiesDataAccessDarkModeModule {}
