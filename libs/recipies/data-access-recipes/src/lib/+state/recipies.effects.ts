import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {switchMap, map, catchError, tap, of} from 'rxjs';
import { RecipiesService } from '../recipies.service';
import * as RecipiesActions from './recipies.actions';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

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
    private snackbarService: MatSnackBar
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
            this.snackbarService.open(error.message, undefined, this.snackBarConfig)
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
            this.snackbarService.open(error.message, undefined, this.snackBarConfig)
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
            this.snackbarService.open(error.message, undefined, this.snackBarConfig)
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
            this.snackbarService.open(error.message, undefined, this.snackBarConfig)
            return of(RecipiesActions.deleteRecipiesFailure(error));
          })
        );
      })
    );
  });

  ngrxOnInitEffects(): Action {
    return RecipiesActions.initRecipies();
  }
}
