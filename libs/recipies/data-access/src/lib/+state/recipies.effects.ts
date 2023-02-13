import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError, tap, delay } from 'rxjs';
import { RecipiesService } from '../recipies.service';
import * as RecipiesActions from './recipies.actions';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class RecipiesEffects implements OnInitEffects {
  toastConfig: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: ['error-snackbar'],
  };

  constructor(
    private readonly actions$: Actions,
    private recipiesService: RecipiesService,
    private router: Router,
    private matSnackBar: MatSnackBar
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
            const loadFailure = RecipiesActions.loadRecipiesFailure(error);
            const snackbarOpen = RecipiesActions.snackbarOpen({
              payload: { message: error.message, config: this.toastConfig },
            });
            return [loadFailure, snackbarOpen];
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
          map((recipe) => {
            return RecipiesActions.saveRecipiesSuccess({ payload: recipe });
          }),
          tap((savedRecipe) => {
            this.router.navigateByUrl(`/${savedRecipe.payload._id}`);
          }),
          catchError((error) => {
            const saveFailure = RecipiesActions.saveRecipiesFailure(error);
            const snackbarOpen = RecipiesActions.snackbarOpen({
              payload: { message: error.message, config: this.toastConfig },
            });
            return [saveFailure, snackbarOpen];
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
            const editFailure = RecipiesActions.editRecipiesFailure(error);
            const snackbarOpen = RecipiesActions.snackbarOpen({
              payload: { message: error.message, config: this.toastConfig },
            });
            return [editFailure, snackbarOpen];
          })
        );
      })
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.deleteRecipe),
      switchMap((action) => {
        return this.recipiesService.deleteRecipe(action._id + '1').pipe(
          map(() => RecipiesActions.deleteRecipiesSuccess({ _id: action._id })),
          tap(() => this.router.navigateByUrl(`/`)),
          catchError((error) => {
            const deleteFailure = RecipiesActions.deleteRecipiesFailure(error);
            const snackbarOpen = RecipiesActions.snackbarOpen({
              payload: { message: error.message, config: this.toastConfig },
            });
            return [deleteFailure, snackbarOpen];
          })
        );
      })
    );
  });

  showSnackbar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.snackbarOpen),
      map((action) => action.payload),
      tap((payload) =>
        this.matSnackBar.open(payload.message, '', payload.config)
      ),
      delay(5000),
      map(() => RecipiesActions.snackbarClose())
    );
  });

  closeSnackbar$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecipiesActions.snackbarClose),
        tap(() => this.matSnackBar.dismiss())
      );
    },
    {
      dispatch: false,
    }
  );

  ngrxOnInitEffects(): Action {
    return RecipiesActions.initRecipies();
  }
}
