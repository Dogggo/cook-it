import { Update } from '@ngrx/entity';
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

export const saveRecipe = createAction(
  '[Recipies/API] Save Recipies',
  props<{ payload: any }>()
);

export const saveRecipiesSuccess = createAction(
  '[Recipies/API] Save Recipies Success',
  props<{ payload: RecipiesEntity }>()
);

export const saveRecipiesFailure = createAction(
  '[Recipies/API] Save Recipies Failure',
  props<{ error: any }>()
);

export const editRecipe = createAction(
  '[Recipies/API] Edit Recipies',
  (payload, id) => ({ payload, id })
);

export const editRecipiesSuccess = createAction(
  '[Recipies/API] Edit Recipies Success',
  props<{ update: Update<RecipiesEntity> }>()
);

export const editRecipiesFailure = createAction(
  '[Recipies/API] Edit Recipies Failure',
  props<{ error: any }>()
);

export const deleteRecipe = createAction(
  '[Recipies/API] Delete Recipies',
  props<{_id: string}>()
);

export const deleteRecipiesSuccess = createAction(
  '[Recipies/API] Delete Recipies Success',
  props<{ _id: string }>()
);

export const deleteRecipiesFailure = createAction(
  '[Recipies/API] Delete Recipies Failure',
  props<{ error: any }>()
);
