/**
 * Interface for the 'Recipies' data
 */

export interface Ingredient {
  _id: string | number;
  name: string;
  quantity: string;
}

export interface RecipiesEntity {
  _id: string | number; // Primary ID
  images: { preview: string };
  name: string;
  description: string;
  preparationTimeInMinutes: number;
  ingredients: Ingredient[];
}
