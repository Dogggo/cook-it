import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import * as DarkModeActions from './dark-mode.actions';
import { Action } from '@ngrx/store';

import { map } from 'rxjs';

@Injectable()
export class DarkModeEffects implements OnInitEffects {
  private actions$ = inject(Actions);

  setDarkMode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DarkModeActions.setDarkMode),
      map((isDarkMode) => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode.payload));
        return DarkModeActions.setDarkModeSuccess({
          payload: isDarkMode.payload,
        });
      })
    );
  });

  ngrxOnInitEffects(): Action {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      return DarkModeActions.setDarkMode({ payload: JSON.parse(darkMode) });
    } else {
      localStorage.setItem('darkMode', 'false');
      return DarkModeActions.setDarkMode({ payload: false });
    }
  }
}
