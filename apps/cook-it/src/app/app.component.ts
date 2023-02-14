import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDarkMode } from '@cook-it/recipies/feature-dark-mode';
import { DarkModeState } from '@cook-it/recipies/feature-dark-mode';

@Component({
  selector: 'cook-it-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDarkTheme$ = this.store.select(selectDarkMode);
  constructor(private store: Store<DarkModeState>) {}
}
