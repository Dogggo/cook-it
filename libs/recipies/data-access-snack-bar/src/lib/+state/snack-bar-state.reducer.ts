import { createReducer, on, Action } from '@ngrx/store';
import * as SnackBarStateActions from './snack-bar-state.actions';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarState } from './snack-bar-state.models';

export const SNACK_BAR_STATE_FEATURE_KEY = 'snackBarState';

export const initialSnackbarConfig: MatSnackBarConfig = {
  horizontalPosition: 'end',
  verticalPosition: 'top',
  panelClass: ['error-snackbar'],
};

export const initialSnackBarState: SnackBarState = {
  message: '',
  config: initialSnackbarConfig,
};

const reducer = createReducer(
  initialSnackBarState,
  on(SnackBarStateActions.snackbarOpen, (state) => ({
    ...state,
    ...initialSnackbarConfig,
  })),
  on(SnackBarStateActions.snackbarClose, () => ({
    ...initialSnackBarState,
  }))
);

export function snackBarStateReducer(state: SnackBarState, action: Action) {
  return reducer(state, action);
}
