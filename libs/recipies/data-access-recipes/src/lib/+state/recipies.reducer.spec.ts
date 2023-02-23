import { Action } from '@ngrx/store';

import * as RecipiesActions from './recipies.actions';
import { RecipiesEntity } from './recipies.models';
import {
  initialRecipiesState,
  recipiesReducer,
  RecipiesState,
} from './recipies.reducer';

const FIRST_RECIPE_ID = 'PRODUCT-AAA';
const SECOND_RECIPE_ID = 'PRODUCT-BBB';
const UPDATED_DESCRIPTION = 'updated';
const error = new Error('http error');

describe('Recipies Reducer', () => {
  const createRecipiesEntity = (
    _id: string,
    name = '',
    description = '',
    images = { preview: '' },
    preparationTimeInMinutes = 0,
    ingredients = []
  ): RecipiesEntity => ({
    _id,
    name,
    description,
    images,
    preparationTimeInMinutes,
    ingredients,
  });

  describe('valid Recipies actions', () => {
    it('loadRecipiesSuccess should return the list of known Recipies', () => {
      //given
      const recipies = [
        createRecipiesEntity(FIRST_RECIPE_ID),
        createRecipiesEntity(SECOND_RECIPE_ID),
      ];
      const action = RecipiesActions.loadRecipiesSuccess({ recipies });

      //when
      const result: RecipiesState = recipiesReducer(
        initialRecipiesState,
        action
      );

      //then
      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      //given
      const action = {} as Action;

      //when
      const result = recipiesReducer(initialRecipiesState, action);

      //then
      expect(result).toBe(initialRecipiesState);
    });
  });

  describe('loadRecipiesFailure', () => {
    it('should return loaded false and error', () => {
      //given
      const action = RecipiesActions.loadRecipiesFailure({ error });

      //when
      const result = recipiesReducer(initialRecipiesState, action);

      //then
      expect(result.loaded).toBe(false);
      expect(result.error).toEqual(error);
    });
  });

  describe('saveRecipiesSuccess', () => {
    it('should return loaded true and new state', () => {
      //given
      const recipe = createRecipiesEntity(FIRST_RECIPE_ID);
      const action = RecipiesActions.saveRecipiesSuccess({ payload: recipe });

      //when
      const result = recipiesReducer(initialRecipiesState, action);

      //then
      expect(result.loaded).toBe(true);
      expect(result.ids).toContain(FIRST_RECIPE_ID);
    });
  });

  describe('saveRecipiesFailure', () => {
    it('should return loaded false and error', () => {
      //given
      const action = RecipiesActions.saveRecipiesFailure({ error });

      //when
      const result = recipiesReducer(initialRecipiesState, action);

      //then
      expect(result.loaded).toBe(false);
      expect(result.error).toEqual(error);
    });
  });

  describe('editRecipiesSuccess', () => {
    it('should return loaded true and new state', () => {
      //given
      const recipe = createRecipiesEntity(FIRST_RECIPE_ID);
      const saveRecipiesSuccessAction = RecipiesActions.saveRecipiesSuccess({
        payload: recipe,
      });
      const state = recipiesReducer(
        initialRecipiesState,
        saveRecipiesSuccessAction
      );

      //when
      const updatedRecipe = { ...recipe, description: UPDATED_DESCRIPTION };
      const editRecipiesSuccessAction = RecipiesActions.editRecipiesSuccess({
        update: { id: recipe._id as number, changes: updatedRecipe },
      });
      const result = recipiesReducer(state, editRecipiesSuccessAction);

      //then
      expect(result.loaded).toBe(true);
      expect(result.entities[FIRST_RECIPE_ID]?.description).toEqual(
        UPDATED_DESCRIPTION
      );
    });
  });

  describe('editRecipiesFailure', () => {
    it('should return loaded false and error', () => {
      //given
      const action = RecipiesActions.editRecipiesFailure({ error });

      //when
      const result = recipiesReducer(initialRecipiesState, action);

      //then
      expect(result.loaded).toBe(false);
      expect(result.error).toEqual(error);
    });
  });

  describe('selectRecipe', () => {
    it('should set selectedId', () => {
      //given
      const action = RecipiesActions.selectRecipe({
        selectedId: FIRST_RECIPE_ID,
      });

      //when
      const result = recipiesReducer(initialRecipiesState, action);

      //then
      expect(result.selectedId).toEqual(FIRST_RECIPE_ID);
    });
  });

  describe('deleteRecipeSuccess', () => {
    it('should return loaded true and new state', () => {
      //given
      const recipe = createRecipiesEntity(FIRST_RECIPE_ID);
      const saveRecipiesSuccess = RecipiesActions.saveRecipiesSuccess({
        payload: recipe,
      });
      const state = recipiesReducer(initialRecipiesState, saveRecipiesSuccess);
      const deleteRecipiesSuccess = RecipiesActions.deleteRecipiesSuccess({
        _id: FIRST_RECIPE_ID,
      });

      //when
      const result = recipiesReducer(state, deleteRecipiesSuccess);

      //then
      expect(result.entities[FIRST_RECIPE_ID]).toBeUndefined();
    });
  });

  describe('deleteRecipeFailure', () => {
    it('should return loaded false and error', () => {
      //given
      const action = RecipiesActions.deleteRecipiesFailure({ error });

      //when
      const result = recipiesReducer(initialRecipiesState, action);

      //then
      expect(result.loaded).toBe(false);
      expect(result.error).toEqual(error);
    });
  });
});
