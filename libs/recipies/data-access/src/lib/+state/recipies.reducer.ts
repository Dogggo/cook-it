import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RecipiesActions from './recipies.actions';
import { RecipiesEntity } from './recipies.models';

export const RECIPIES_FEATURE_KEY = 'recipies';

export interface RecipiesState extends EntityState<RecipiesEntity> {
  selectedId?: string | number; // which Recipies record has been selected
  loaded: boolean; // has the Recipies list been loaded
  error?: string | null; // last known error (if any)
}

export interface RecipiesPartialState {
  readonly [RECIPIES_FEATURE_KEY]: RecipiesState;
}

export const recipiesAdapter: EntityAdapter<RecipiesEntity> =
  createEntityAdapter<RecipiesEntity>({
    selectId: (recipie) => recipie._id as string,
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
  on(RecipiesActions.loadRecipiesSuccess, (state, { recipies }) =>
    recipiesAdapter.setAll(recipies, { ...state, loaded: true })
  ),
  on(RecipiesActions.loadRecipiesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RecipiesActions.selectRecipe, (state, {selectedId}) => ({
    ...state,
    selectedId: selectedId
  }))
);

export function recipiesReducer(
  state: RecipiesState | undefined,
  action: Action
) {
  return reducer(state, action);
}

