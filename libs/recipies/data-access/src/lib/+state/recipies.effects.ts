import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError, of } from 'rxjs';
import { RecipiesService } from '../recipies.service';

import * as RecipiesActions from './recipies.actions';

@Injectable()
export class RecipiesEffects implements OnInitEffects {
  constructor(
    private readonly actions$: Actions,
    private recipiesService: RecipiesService
  ) {}

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.initRecipies),
      switchMap(() => {
        return this.recipiesService.getRecipies().pipe(
          map((recipies) => {
            return RecipiesActions.loadRecipiesSuccess({ recipies });
          }),
          catchError((error) => {
            return of(RecipiesActions.loadRecipiesFailure(error));
          })
        );
      })
    );
  });

  select$ = (() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.selectRecipe),
      map((action) => {
        return RecipiesActions.selectRecipe({selectedId: action.selectedId})
      })
    )
  })

  ngrxOnInitEffects(): Action {
    return RecipiesActions.initRecipies();
  }
}
