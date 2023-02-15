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
        tap((action) => {
          localStorage.setItem('darkMode', JSON.stringify(action.payload));
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
      return DarkModeActions.setDarkMode({ payload: JSON.parse(darkMode) });
    } else {
      localStorage.setItem('darkMode', 'false');
      return DarkModeActions.setDarkMode({ payload: false });
    }
  }
}
