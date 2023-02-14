import { createAction, props } from '@ngrx/store';
import { SnackBarState } from './snack-bar-state.models';

export const snackbarOpen = createAction(
  'Open Snackbar',
  props<{ payload: SnackBarState }>()
);

export const snackbarClose = createAction('Close Snackbar');
