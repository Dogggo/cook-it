import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipiesEntity } from './recipies.models';
import {
  RECIPIES_FEATURE_KEY,
  RecipiesState,
  recipiesAdapter,
} from './recipies.reducer';

// Lookup the 'Recipies' feature state managed by NgRx
export const getRecipiesState =
  createFeatureSelector<RecipiesState>(RECIPIES_FEATURE_KEY);

const { selectAll, selectEntities } = recipiesAdapter.getSelectors();

export const getRecipiesLoaded = createSelector(
  getRecipiesState,
  (state: RecipiesState) => state.loaded
);

export const getRecipiesError = createSelector(
  getRecipiesState,
  (state: RecipiesState) => state.error
);

export const getAllRecipies = createSelector(
  getRecipiesState,
  (state: RecipiesState) => selectAll(state)
);


export const getRecipiesEntities = createSelector(
  getRecipiesState,
  (state: RecipiesState) => selectEntities(state)
  );

  export const getRecipeById = createSelector(
    getRecipiesEntities,
    (entities: any, router: any): RecipiesEntity => {
      return router.state && entities[router.state.params.pizzaId];
    }
  )

export const getSelectedId = createSelector(
  getRecipiesState,
  (state: RecipiesState) => state.selectedId
);

export const getSelected = createSelector(
  getRecipiesEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
