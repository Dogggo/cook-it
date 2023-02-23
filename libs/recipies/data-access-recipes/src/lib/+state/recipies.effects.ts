import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { RecipiesService } from '../recipies.service';
import * as RecipiesActions from './recipies.actions';
import { setDataInvalid } from './recipies.actions';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RecipiesEntity } from './recipies.models';
import { config } from '@cook-it/recipies/utils-config';

const cache = new Map<string, RecipiesEntity[]>();

@Injectable()
export class RecipiesEffects implements OnInitEffects {
  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 3000,
    panelClass: ['error-snackbar'],
  };

  constructor(
    private readonly actions$: Actions,
    private recipiesService: RecipiesService,
    private router: Router,
    private snackbarService: MatSnackBar,
    private store: Store
  ) {}

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.loadRecipies),
      switchMap((action) => {
        const stringifiedAction = JSON.stringify(action);
        if (cache.has(stringifiedAction)) {
          return of(
            RecipiesActions.loadRecipiesSuccess({
              recipies: cache.get(stringifiedAction)!,
            })
          );
        } else {
          return this.recipiesService.getRecipies().pipe(
            map((recipies) => {
              cache.set(stringifiedAction, recipies);
              return RecipiesActions.loadRecipiesSuccess({ recipies });
            }),
            catchError((error) => {
              this.snackbarService.open(
                error.message,
                undefined,
                this.snackBarConfig
              );
              return of(RecipiesActions.loadRecipiesFailure(error));
            })
          );
        }
      })
    );
  });

  loadOnSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecipiesActions.loadRecipiesSuccess),
        tap(() => {
          setTimeout(() => {
            cache.clear();
            this.store.dispatch(setDataInvalid());
          }, config.cacheExpirationTime);
        })
      );
    },
    {
      dispatch: false,
    }
  );

  save$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.saveRecipe),
      switchMap((action) => {
        return this.recipiesService.saveRecipe(action.payload).pipe(
          map((recipe) => {
            return RecipiesActions.saveRecipiesSuccess({ payload: recipe });
          }),
          tap((savedRecipe) => {
            this.router.navigateByUrl(`/${savedRecipe.payload._id}`);
          }),
          catchError((error) => {
            this.snackbarService.open(
              error.message,
              undefined,
              this.snackBarConfig
            );
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
          tap((recipe) => {
            this.router.navigateByUrl(`/${recipe.update.id}`);
          }),
          catchError((error) => {
            this.snackbarService.open(
              error.message,
              undefined,
              this.snackBarConfig
            );
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
        return this.recipiesService.deleteRecipe(action._id).pipe(
          map(() => RecipiesActions.deleteRecipiesSuccess({ _id: action._id })),
          tap(() => this.router.navigateByUrl(`/`)),
          catchError((error) => {
            this.snackbarService.open(
              error.message,
              undefined,
              this.snackBarConfig
            );
            return of(RecipiesActions.deleteRecipiesFailure(error));
          })
        );
      })
    );
  });

  ngrxOnInitEffects(): Action {
    return RecipiesActions.loadRecipies();
  }
}
