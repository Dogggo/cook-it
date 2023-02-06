import { createServiceFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import {
  initialRecipiesState,
  RecipiesState,
} from '@cook-it/recipies/data-access';

describe('testing store', () => {
  let store: MockStore<RecipiesState>;
  const initialState = initialRecipiesState;
  // let spectator: Spectator<>
});
