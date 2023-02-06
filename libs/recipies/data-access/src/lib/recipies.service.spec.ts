import { RecipiesService } from './recipies.service';
import { HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { createHttpFactory } from '@ngneat/spectator/jest';
import { RecipiesEntity } from '@cook-it/recipies/data-access';

const baseUrl =
  'https://crudcrud.com/api/da7f3c4e010a47979c980e57dea0c070/recipes';

const RECIPE_FIRST_ID = '1';
const RECIPE_FIRST_DESCRIPTION = 'first recipe';
const RECIPE_FIRST: RecipiesEntity = {
  _id: RECIPE_FIRST_ID,
  description: RECIPE_FIRST_DESCRIPTION,
  images: { preview: '' },
  ingredients: [],
  name: '',
  preparationTimeInMinutes: 10,
};

const RECIPE_SECOND_ID = '2';
const RECIPE_SECOND_DESCRIPTION = 'second recipe';
const RECIPE_SECOND: RecipiesEntity = {
  _id: RECIPE_SECOND_ID,
  description: RECIPE_SECOND_DESCRIPTION,
  images: { preview: '' },
  ingredients: [],
  name: '',
  preparationTimeInMinutes: 10,
};

describe('RecipiesService testing', () => {
  let spectator: SpectatorHttp<RecipiesService>;
  const createHttp = createHttpFactory(RecipiesService);

  beforeEach(() => (spectator = createHttp()));

  it('can test RecipiesService.getRecipies', () => {
    //given, when
    spectator.service.getRecipies().subscribe();
    //then
    spectator.expectOne(baseUrl, HttpMethod.GET);
  });

  it('can test RecipiesService.saveRecipe', () => {
    //given, when
    spectator.service.saveRecipe(RECIPE_FIRST).subscribe();
    //then
    const req = spectator.expectOne(baseUrl, HttpMethod.POST);
    expect(req.request.body['_id']).toEqual(RECIPE_FIRST._id);
  });
});
