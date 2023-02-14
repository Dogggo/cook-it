import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { map, tap, delay } from 'rxjs';
import * as SnackbarActions from '../../index';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarStateEffects {
  private actions$ = inject(Actions);
  private matSnackBar = inject(MatSnackBar);
  showSnackbar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SnackbarActions.snackbarOpen),
      map((action) => action.payload),
      tap((payload) =>
        this.matSnackBar.open(payload.message, '', payload.config)
      ),
      delay(5000),
      map(() => SnackbarActions.snackbarClose())
    );
  });

  closeSnackbar$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SnackbarActions.snackbarClose),
        tap(() => this.matSnackBar.dismiss())
      );
    },
    {
      dispatch: false,
    }
  );
}
