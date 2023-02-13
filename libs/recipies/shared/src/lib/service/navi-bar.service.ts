import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NaviBarService {

  private _darkTheme$ = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this._darkTheme$.asObservable();

  setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme$.next(isDarkTheme);
  }
}
