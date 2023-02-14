import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSnackbar from './+state/snack-bar-state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SnackBarStateEffects } from './+state/snack-bar-state.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSnackbar.SNACK_BAR_STATE_FEATURE_KEY,
      fromSnackbar.snackBarStateReducer
    ),
    EffectsModule.forFeature([SnackBarStateEffects]),
  ],
})
export class RecipiesFeatureSnackBarModule {}
