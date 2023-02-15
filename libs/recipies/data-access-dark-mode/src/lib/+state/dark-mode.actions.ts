import { createAction, props } from '@ngrx/store';

export const setDarkMode = createAction(
  'Set DarkMode',
  props<{ payload: boolean }>()
);
