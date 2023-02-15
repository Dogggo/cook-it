import { SpectatorHost } from '@ngneat/spectator';
import { RecipeOverviewComponent } from './recipe-overview.component';
import { createHostFactory } from '@ngneat/spectator/jest';
import { RecipiesOverview } from '../model/recipes-overview.interface';
import { FormatTimePipe } from '@cook-it/recipies/shared';

describe('RecipeOverviewComponent', () => {
  let spectator: SpectatorHost<RecipeOverviewComponent>;
  const createHost = createHostFactory(RecipeOverviewComponent);
  const baseSelector = (selector: string) => `[data-cy=${selector}]`;
  const recipe: RecipiesOverview = {
    images: { preview: '' },
    name: 'spagetti',
    description: 'bolognese',
    preparationTimeInMinutes: 30,
    ingredients: [
      {
        name: 'pasta',
        quantity: '100g',
      },
      {
        name: 'tomato paste',
        quantity: '500ml',
      },
    ],
  };

  it('should display all information about recipe', () => {
    spectator = createHost(
      '<cook-it-recipe-overview [recipe]="recipe"></cook-it-recipe-overview>',
      {
        hostProps: {
          recipe: recipe,
        },
      }
    );
    expect(spectator.query(baseSelector('preview-image'))).toHaveAttribute(
      'src',
      '/' + recipe.images.preview
    );
    expect(spectator.query(baseSelector('name'))).toHaveText(recipe.name);
    expect(spectator.query(baseSelector('description'))).toHaveText(
      recipe.description
    );
    expect(spectator.query(baseSelector('preparationTime'))).toHaveText(
      `Preparation time - ${FormatTimePipe.prototype.transform(
        recipe.preparationTimeInMinutes
      )}`
    );
    expect(spectator.query(baseSelector('ingredients'))).toBeDefined();
    expect(spectator.queryAll(baseSelector('ingredients'))).toHaveLength(recipe.ingredients.length);
  });
});
