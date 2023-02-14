import { Injectable } from '@angular/core';
import { OnInitEffects } from '@ngrx/effects';
import * as DarkModeActions from './dark-mode.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class DarkModeEffects implements OnInitEffects {
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
