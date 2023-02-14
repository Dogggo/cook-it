import { createFeatureSelector } from '@ngrx/store';
import { SNACK_BAR_STATE_FEATURE_KEY } from './snack-bar-state.reducer';
import { SnackBarState } from './snack-bar-state.models';

export const selectSnackBarStateState = createFeatureSelector<SnackBarState>(
  SNACK_BAR_STATE_FEATURE_KEY
);
