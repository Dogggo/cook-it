import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DARK_MODE_FEATURE_KEY } from './dark-mode.reducer';
import { DarkModeState } from './dark-mode.models';

export const selectDarkModeState = createFeatureSelector<DarkModeState>(
  DARK_MODE_FEATURE_KEY
);

export const selectDarkMode = createSelector(selectDarkModeState, (state) => {
  return state.isDarkMode;
});
