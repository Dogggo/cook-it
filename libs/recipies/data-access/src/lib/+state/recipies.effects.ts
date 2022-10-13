import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError, of } from 'rxjs';
import { RecipiesService } from '../recipies.service';
import * as RecipiesActions from './recipies.actions';

@Injectable()
export class RecipiesEffects implements OnInitEffects {
  constructor(
    private readonly actions$: Actions,
    private recipiesService: RecipiesService,
    private router: Router
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

  save$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.saveRecipe),
      switchMap((action) => {
        return this.recipiesService.saveRecipe(action.payload).pipe(
          map((recipie) => {
            const savedRecipe = RecipiesActions.saveRecipiesSuccess(recipie);
            this.router.navigateByUrl(
              `/recipe-list/${savedRecipe.payload._id}`
            );
            return savedRecipe;
          }),
          catchError((error) => {
            return of(RecipiesActions.saveRecipiesFailure(error));
          })
        );
      })
    );
  });

  edit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.editRecipe),
      switchMap((action) => {
        return this.recipiesService.editRecipe(action.payload, action.id).pipe(
          map((recipie) => {
            return RecipiesActions.editRecipiesSuccess({
              update: { id: recipie._id as number, changes: recipie },
            });
          }),
          catchError((error) => {
            return of(RecipiesActions.editRecipiesFailure(error));
          })
        );
      })
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.deleteRecipe),
      switchMap((action) => {
        return this.recipiesService.deleteRecipe(action.id).pipe(
          map((_id) => {
            const deletedRecipe = RecipiesActions.deleteRecipiesSuccess({
              _id,
            });
            this.router.navigateByUrl(`/recipe-list`);
            return deletedRecipe;
          }),
          catchError((error) => {
            return of(RecipiesActions.deleteRecipiesFailure(error));
          })
        );
      })
    );
  });

  select$ = () => {
    return this.actions$.pipe(
      ofType(RecipiesActions.selectRecipe),
      map((action) => {
        return RecipiesActions.selectRecipe(action.payload);
      })
    );
  };

  ngrxOnInitEffects(): Action {
    return RecipiesActions.initRecipies();
  }
}
