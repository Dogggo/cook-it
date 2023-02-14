import { MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Interface for the 'SnackBarState' data
 */
export interface SnackBarState {
  message: string;
  config: MatSnackBarConfig;
}
