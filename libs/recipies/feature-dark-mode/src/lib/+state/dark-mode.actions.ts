import { createAction, props } from '@ngrx/store';

export const setDarkMode = createAction(
  'Set DarkMode',
  props<{ payload: boolean }>()
);

export const setDarkModeSuccess = createAction(
  'Set DarkMode Success',
  props<{ payload: boolean }>()
);
