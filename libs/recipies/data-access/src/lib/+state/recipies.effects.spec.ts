import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {Router} from '@angular/router';
import {of, ReplaySubject, throwError} from 'rxjs';

import * as RecipiesActions from './recipies.actions';
import {RecipiesEffects} from './recipies.effects';
import { RecipiesEntity } from './recipies.models';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import {RecipiesService} from '../recipies.service';
import {RouterTestingModule} from "@angular/router/testing";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {RecipeDetailsComponent} from "@cook-it/recipies/feature-recipe-details";

const FIRST_RECIPE_ID = 'PRODUCT-AAA';
const SECOND_RECIPE_ID = 'PRODUCT-BBB';
const FIRST_RECIPE_DES = "first des";
const SECOND_RECIPE_DES = "second des";

const router = {
  navigateByUrl: jest.spyOn(Router.prototype, 'navigateByUrl')
};

const createRecipiesEntity = (
  _id: string,
  name = '',
  description = '',
  images = {preview: ''},
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
  let actions$: ReplaySubject<Action>;
  let effects: RecipiesEffects;
  let recipies: RecipiesEntity[];
  let recipiesService: RecipiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path: ':id', component: RecipeDetailsComponent}
      ])],
      providers: [
        RecipiesEffects,
        RecipiesService,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });
    effects = TestBed.inject(RecipiesEffects);
    recipiesService = TestBed.inject(RecipiesService);
  });

  describe('init$', () => {

    beforeEach(() => {
      recipies = [
        createRecipiesEntity(FIRST_RECIPE_ID),
        createRecipiesEntity(SECOND_RECIPE_ID),
      ];
      actions$ = new ReplaySubject(1);
      actions$.next(RecipiesActions.initRecipies())
    })

    it('should return loadRecipiesSuccess action, on success', () => {
      jest.spyOn(recipiesService, 'getRecipies').mockReturnValue(of(recipies));
      effects.init$.subscribe(resultAction => {
        expect(resultAction).toEqual(RecipiesActions.loadRecipiesSuccess({recipies}));
      })
    });

    it('should return loadRecipiesFailure action on failure', () => {
      jest.spyOn(recipiesService, 'getRecipies').mockReturnValue(throwError(() => new Error('404')));
      effects.init$.subscribe(resultAction => {
        expect(resultAction).toEqual(RecipiesActions.loadRecipiesFailure);
      })
    })
  });

  describe('save$', () => {
    const recipeToSave = createRecipiesEntity(FIRST_RECIPE_ID);

    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(RecipiesActions.saveRecipe({payload: recipeToSave}));
    })

    it('should return saveRecipiesSuccess action and navigate to saved recipe, on success', (done) => {
      jest.spyOn(recipiesService, 'saveRecipe').mockReturnValue(of(recipeToSave));

      effects.save$.subscribe((res) => {
        expect(res).toEqual(RecipiesActions.saveRecipiesSuccess({payload: recipeToSave}));
        expect(router.navigateByUrl).toHaveBeenCalledWith(`/${FIRST_RECIPE_ID}`);
        done();
      })
    });

    it('should return saveRecipiesFailure action on failure', () => {
      jest.spyOn(recipiesService, 'getRecipies').mockReturnValue(throwError(() => new Error('404')));
      effects.init$.subscribe(resultAction => {
        expect(resultAction).toEqual(RecipiesActions.loadRecipiesFailure);
      })
    })
  })

  describe('edit$', () => {
    const recipeBeforeEdit = createRecipiesEntity(FIRST_RECIPE_ID, '', FIRST_RECIPE_DES);
    const editedRecipe = {...recipeBeforeEdit, description: SECOND_RECIPE_DES};

    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(RecipiesActions.editRecipe({payload: editedRecipe, id: editedRecipe._id as string}));
    })

    it('should return editRecipiesSuccess action and navigate to saved recipe, on success', (done) => {
      jest.spyOn(recipiesService, 'editRecipe').mockReturnValue(of(editedRecipe));

      effects.edit$.subscribe((resultAction) => {
        expect(resultAction).toEqual(RecipiesActions.editRecipiesSuccess(
          {
            update: {id: recipeBeforeEdit._id as string, changes: editedRecipe},
          }));
        expect(router.navigateByUrl).toHaveBeenCalledWith(`/${recipeBeforeEdit._id}`);
        done();
      })
    });

    it('should return editRecipiesFailure action on failure', () => {
      jest.spyOn(recipiesService, 'editRecipe').mockReturnValue(throwError(() => new Error('404')));
      effects.edit$.subscribe(resultAction => {
        expect(resultAction).toEqual(RecipiesActions.editRecipiesFailure);
      })
    })
  })

  describe('delete$', () => {
    const recipeToDelete = createRecipiesEntity(FIRST_RECIPE_ID, '', FIRST_RECIPE_DES);

    beforeEach(() => {
      actions$ = new ReplaySubject(1);
      actions$.next(RecipiesActions.deleteRecipe({_id: recipeToDelete._id as string}));
    })

    it('should return deleteRecipiesSuccess action and navigate to home page, on success', (done) => {
      jest.spyOn(recipiesService, 'deleteRecipe').mockReturnValue(of(recipeToDelete._id as string));

      effects.delete$.subscribe((resultAction) => {
        expect(resultAction).toEqual(RecipiesActions.deleteRecipiesSuccess({_id: recipeToDelete._id as string}));
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
        done();
      })
    });

    it('should return deleteRecipiesFailure action on failure', () => {
      jest.spyOn(recipiesService, 'deleteRecipe').mockReturnValue(throwError(() => new Error('404')));
      effects.delete$.subscribe(resultAction => {
        expect(resultAction).toEqual(RecipiesActions.deleteRecipiesFailure);
      })
    })
  })
});
