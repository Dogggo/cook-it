import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  RECIPIES_FEATURE_KEY,
  RecipiesState,
  recipiesAdapter,
} from './recipies.reducer';

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

export const getSearchPhrase = createSelector(
  getRecipiesState,
  (state: RecipiesState) => state.searchPhrase
);

export const getAllRecipies = createSelector(
  getRecipiesState,
  (state: RecipiesState) => selectAll(state)
);

export const getRecipiesEntities = createSelector(
  getRecipiesState,
  (state: RecipiesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getRecipiesState,
  (state: RecipiesState) => state.selectedId
);

export const getSelected = createSelector(
  getRecipiesEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getRecipiesBySearchPhrase = createSelector(
  getAllRecipies,
  getSearchPhrase,
  (entities, searchPhrase) =>
    entities.filter(
      (entity) =>
        entity.name.toUpperCase().startsWith(searchPhrase.toUpperCase()) ||
        entity.ingredients.some((ing) =>
          ing.name.toUpperCase().startsWith(searchPhrase.toUpperCase())
        )
    )
);

export const getRecipiesNamesBySearchPhrase = (searchPhrase: string) =>
  createSelector(getRecipiesBySearchPhrase, (entities) =>
    entities.map((entity) => entity.name)
  );
