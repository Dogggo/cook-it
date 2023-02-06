import { RecipeAddComponent } from './recipe-add.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  initialRecipiesState,
  RecipiesState,
} from '@cook-it/recipies/data-access';
import { Spectator } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';

describe('RecipeAddComponent', () => {
  let store: MockStore<RecipiesState>;
  const initialState = initialRecipiesState;
  let spectator: Spectator<RecipeAddComponent>;

  const createCompontn = createComponentFactory({
    component: RecipeAddComponent,
    declarations: [RecipeAddComponent],
    providers: [provideMockStore({ initialState })],
  });

  beforeEach(() => {
    spectator = createCompontn();
    store = spectator.inject(MockStore);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
