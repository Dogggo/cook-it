import { RecipiesEntity } from './recipies.models';
import {
  initialRecipiesState,
  recipiesAdapter,
  RecipiesPartialState,
} from './recipies.reducer';
import * as RecipiesSelectors from './recipies.selectors';

describe('Recipies Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRecipiesId = (it: RecipiesEntity) => it._id;
  const createRecipiesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as RecipiesEntity);

  let state: RecipiesPartialState;

  beforeEach(() => {
    state = {
      recipies: recipiesAdapter.setAll(
        [
          createRecipiesEntity('PRODUCT-AAA'),
          createRecipiesEntity('PRODUCT-BBB'),
          createRecipiesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialRecipiesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Recipies Selectors', () => {
    it('getAllRecipies() should return the list of Recipies', () => {
      const results = RecipiesSelectors.getAllRecipies(state);
      const selId = getRecipiesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = RecipiesSelectors.getSelected(state) as RecipiesEntity;
      const selId = getRecipiesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getRecipiesLoaded() should return the current "loaded" status', () => {
      const result = RecipiesSelectors.getRecipiesLoaded(state);

      expect(result).toBe(true);
    });

    it('getRecipiesError() should return the current "error" state', () => {
      const result = RecipiesSelectors.getRecipiesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
