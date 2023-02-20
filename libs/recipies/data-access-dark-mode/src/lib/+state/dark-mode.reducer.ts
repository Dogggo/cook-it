import { createReducer, on, Action } from '@ngrx/store';

import * as DarkModeActions from './dark-mode.actions';
import { DarkModeState } from './dark-mode.models';

export const DARK_MODE_FEATURE_KEY = 'darkMode';

export const initialDarkModeState: DarkModeState = {
  isDarkMode: false,
};

const reducer = createReducer(
  initialDarkModeState,
  on(DarkModeActions.setDarkMode, (state) => {
    return { ...state, isDarkMode: true };
  }),
  on(DarkModeActions.setLightMode, (state) => {
    return { ...state, isDarkMode: false };
  })
);
export function darkModeReducer(state: DarkModeState, action: Action) {
  return reducer(state, action);
}
