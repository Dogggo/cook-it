import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  getRecipiesLoaded,
  loadRecipies,
  RecipiesState,
} from '@cook-it/recipies/data-access-recipes';
import { Store } from '@ngrx/store';
import { catchError, first, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesGuard implements CanActivate {
  constructor(private store: Store<RecipiesState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getRecipiesLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(loadRecipies());
        }
      }),
      first(Boolean)
    );
  }
}
