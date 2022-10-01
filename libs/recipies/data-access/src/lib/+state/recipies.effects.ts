import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { RecipiesService } from 'libs/recipies/data-access/src/lib/recipies.service';
import { switchMap, map, catchError, of } from 'rxjs';

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
        return RecipiesActions.selectRecipe(action.payload)
      })
    )
  })

  ngrxOnInitEffects(): Action {
    return RecipiesActions.initRecipies();
  }
}
