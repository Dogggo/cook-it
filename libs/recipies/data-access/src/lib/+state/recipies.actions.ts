import { createAction, props } from '@ngrx/store';
import { RecipiesEntity } from './recipies.models';

export const initRecipies = createAction('[Recipies/API] Load Recipies');

export const loadRecipiesSuccess = createAction(
  '[Recipies/API] Load Recipies Success',
  props<{ recipies: RecipiesEntity[] }>()
);

export const loadRecipiesFailure = createAction(
  '[Recipies/API] Load Recipies Failure',
  props<{ error: any }>()
);

export const selectRecipe = createAction(
  '[Recipies] Select Recipe',
  props<{ selectedId: string }>()
);
