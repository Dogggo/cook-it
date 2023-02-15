import { IngredientOverview } from './ingredients-overview.interface';

export interface RecipiesOverview {
  images: { preview: string };
  name: string;
  description: string;
  preparationTimeInMinutes: number;
  ingredients: IngredientOverview[];
}
