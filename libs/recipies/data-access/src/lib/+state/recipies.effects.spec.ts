import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as RecipiesActions from './recipies.actions';
import { RecipiesEffects } from './recipies.effects';
import { RecipiesEntity } from '@cook-it/recipies/data-access';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RecipiesService } from '../recipies.service';

const FIRST_RECIPE_ID = 'PRODUCT-AAA';
const SECOND_RECIPE_ID = 'PRODUCT-BBB';

const baseUrl =
  'https://crudcrud.com/api/da7f3c4e010a47979c980e57dea0c070/recipes';
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

describe('RecipiesEffects', () => {
  let actions$: Observable<Action>;
  let effects: RecipiesEffects;
  let recipiesService: RecipiesService;
  // let met

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        RecipiesEffects,
        RecipiesService,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(RecipiesEffects);
    recipiesService = TestBed.inject(RecipiesService);
  }));

  describe('init$', () => {
    it('should return loadRecipiesSuccess action, on success', () => {
      const recipies = [
        createRecipiesEntity(FIRST_RECIPE_ID),
        createRecipiesEntity(SECOND_RECIPE_ID),
      ];
      let spy = jest
        .spyOn(recipiesService, 'getRecipies')
        .mockReturnValue(of(recipies));
      const action = RecipiesActions.initRecipies();

      actions$ = hot('a', { a: action });

      expect(effects.init$).toBeObservable(
        cold('a', { a: RecipiesActions.loadRecipiesSuccess({ recipies }) })
      );
    });
  });

  // describe('init$', () => {
  //   it('should work', () => {
  //     actions$ = hot('-a-|', {a: RecipiesActions.initRecipies()});
  //
  //     const expected = hot('-a-|', {
  //       a: RecipiesActions.loadRecipiesSuccess({recipies: []}),
  //     });
  //
  //     expect(effects.init$).toBeObservable(expected);
  //   });
  // });

  // describe('save$', () => {
  //   it('should return a RecipiesActons.saveRecipiesOnSuccess action, with the data', () => {
  //     const payload = createRecipiesEntity(FIRST_RECIPE_ID);
  //     const action = RecipiesActions.initRecipies();
  //     const completion = RecipiesActions.saveRecipiesSuccess({payload});
  //
  //     actions$ = hot('-a', {a: payload});
  //     const req = httpTestingController.expectOne(baseUrl);
  //     req.flush(payload)
  //     const response = cold('-b|', {b: payload});
  //     const expected = cold('--c', {c: completion});
  //
  //     expect(effects.init$).toBeObservable(expected);
  //
  //   })
  // })
});
