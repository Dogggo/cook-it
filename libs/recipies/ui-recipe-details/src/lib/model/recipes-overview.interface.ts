import { IngredientOverview } from './ingredients-overview.interface';

export interface RecipiesOverview {
  _id: string | number; // Primary ID
  images: { preview: string };
  name: string;
  description: string;
  preparationTimeInMinutes: number;
  ingredients: IngredientOverview[];
}
