import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RecipiesActions from './recipies.actions';
import { RecipiesEntity } from './recipies.models';

export const RECIPIES_FEATURE_KEY = 'recipies';

export interface RecipiesState extends EntityState<RecipiesEntity> {
  selectedId?: string;
  loaded: boolean;
  error?: string | null;
}

export interface RecipiesPartialState {
  readonly [RECIPIES_FEATURE_KEY]: RecipiesState;
}

export const recipiesAdapter: EntityAdapter<RecipiesEntity> =
  createEntityAdapter<RecipiesEntity>({
    selectId: (recipe) => recipe._id as string,
  });

export const initialRecipiesState: RecipiesState =
  recipiesAdapter.getInitialState({
    // set initial required properties
    state: [],
    loaded: false,
    error: null,
  });

const reducer = createReducer(
  initialRecipiesState,
  on(RecipiesActions.initRecipies, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RecipiesActions.loadRecipiesSuccess, (state, { recipies }) => {
    return recipiesAdapter.setAll(recipies, { ...state, loaded: true });
  }),
  on(RecipiesActions.loadRecipiesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RecipiesActions.selectRecipe, (state, { payload }) => ({
    ...state,
    selectedId: payload,
  })),
  on(RecipiesActions.saveRecipe, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RecipiesActions.saveRecipiesSuccess, (state, { payload }) => {
    return recipiesAdapter.addOne({ ...payload }, { ...state, loaded: true });
  }),
  on(RecipiesActions.saveRecipiesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RecipiesActions.editRecipe, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RecipiesActions.editRecipiesSuccess, (state, { update }) => {
    return recipiesAdapter.updateOne(update, state);
  }),
  on(RecipiesActions.editRecipiesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RecipiesActions.deleteRecipe, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RecipiesActions.deleteRecipiesSuccess, (state, { _id }) => {
    console.log(_id)
    return recipiesAdapter.removeOne(_id, state);
  }),
  on(RecipiesActions.deleteRecipiesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function recipiesReducer(
  state: RecipiesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
