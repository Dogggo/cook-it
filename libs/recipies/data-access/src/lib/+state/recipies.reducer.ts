import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RecipiesActions from './recipies.actions';
import { RecipiesEntity } from './recipies.models';

export const RECIPIES_FEATURE_KEY = 'recipies';

export interface RecipiesState extends EntityState<RecipiesEntity> {
  selectedId?: string;
  loaded: boolean;
  error?: string | null;
  showToast: boolean;
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
    showToast: false,
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
  on(RecipiesActions.saveRecipiesSuccess, (state, { payload }) => {
    return recipiesAdapter.addOne(payload, { ...state, loaded: true });
  }),
  on(RecipiesActions.saveRecipiesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RecipiesActions.editRecipiesSuccess, (state, { update }) => {
    return recipiesAdapter.updateOne(update, { ...state, loaded: true });
  }),
  on(RecipiesActions.editRecipiesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RecipiesActions.selectRecipe, (state, { selectedId }) => ({
    ...state,
    selectedId,
  })),
  on(RecipiesActions.deleteRecipiesSuccess, (state, { _id }) => {
    return recipiesAdapter.removeOne(_id, { ...state, loaded: true });
  }),
  on(RecipiesActions.deleteRecipiesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RecipiesActions.snackbarClose, (state) => ({
    ...state,
    showToast: false,
  })),
  on(RecipiesActions.snackbarOpen, (state) => ({
    ...state,
    showToast: true,
  }))
);

export function recipiesReducer(
  state: RecipiesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
