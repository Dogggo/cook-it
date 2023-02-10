import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {switchMap, map, catchError, of, tap, delay} from 'rxjs';
import { RecipiesService } from '../recipies.service';
import * as RecipiesActions from './recipies.actions';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable()
export class RecipiesEffects implements OnInitEffects {

  toastConfig: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: ['error-snackbar']
  }

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
          map((recipe) => {
            return RecipiesActions.saveRecipiesSuccess({ payload: recipe });
          }),
          tap((savedRecipe) => {
            this.router.navigateByUrl(`/${savedRecipe.payload._id}`);
          }),
          catchError((error) => {
             of(RecipiesActions.saveRecipiesFailure(error));
             return of(RecipiesActions.snackbarOpen({payload: {message: error.message, config: this.toastConfig}}))
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
            of(RecipiesActions.editRecipiesFailure(error));
            return of(RecipiesActions.snackbarOpen({payload: {message: error.message, config: this.toastConfig}}))
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
          map((_id) => RecipiesActions.deleteRecipiesSuccess({ _id })),
          tap(() => this.router.navigateByUrl(`/`)),
          catchError((error) => {
            of(RecipiesActions.deleteRecipiesFailure(error));
            return of(RecipiesActions.snackbarOpen({payload: {message: error.message, config: this.toastConfig}}))
          })
        );
      })
    );
  });

  showSnackbar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.snackbarOpen),
      map((action) => action.payload),
      tap(payload => this.matSnackBar.open(payload.message, '', payload.config)),
      delay(5000),
      map(() => RecipiesActions.snackbarClose())
    )
  })

  closeSnackbar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipiesActions.snackbarClose),
      tap(() => this.matSnackBar.dismiss())
    )
  },
    {
      dispatch: false
    })

  ngrxOnInitEffects(): Action {
    return RecipiesActions.initRecipies();
  }
}
