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

export const getRecipiesBySearchPhrase = (searchPhrase: string) =>
  createSelector(getAllRecipies, (entities) =>
    entities.filter(
      (entity) =>
        entity.name.startsWith(searchPhrase) ||
        entity.ingredients.some((ing) => ing.name.startsWith(searchPhrase))
    )
  );

export const getRecipiesNamesBySearchPhrase = (searchPhrase: string) =>
  createSelector(getRecipiesBySearchPhrase(searchPhrase), (entities) =>
    entities.map((entity) => entity.name)
  );
