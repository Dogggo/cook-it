import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import * as DarkModeActions from './dark-mode.actions';
import { Action } from '@ngrx/store';
import { tap } from 'rxjs';

@Injectable()
export class DarkModeEffects implements OnInitEffects {
  actions$ = inject(Actions);

  setDarkMode$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DarkModeActions.setDarkMode),
        tap(() => {
          localStorage.setItem('darkMode', 'true');
        })
      );
    },
    {
      dispatch: false,
    }
  );

  setLightMode = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DarkModeActions.setLightMode),
        tap(() => {
          localStorage.setItem('darkMode', 'false');
        })
      );
    },
    {
      dispatch: false,
    }
  );

  ngrxOnInitEffects(): Action {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode) {
      const parsedDarkMode = JSON.parse(darkMode);
      return parsedDarkMode
        ? DarkModeActions.setDarkMode()
        : DarkModeActions.setLightMode();
    } else {
      localStorage.setItem('darkMode', 'false');
      return DarkModeActions.setLightMode();
    }
  }
}
