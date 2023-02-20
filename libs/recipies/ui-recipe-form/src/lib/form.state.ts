import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  IngredientOverview,
  RecipiesOverview,
} from '@cook-it/recipies/ui-recipe-details';

@Injectable()
export class FormState {
  constructor(private formBuilder: NonNullableFormBuilder) {}

  readonly nameRecipeMinLength = 3;
  readonly nameRecipeMaxLength = 80;
  readonly descriptionRecipeMinLength = 15;
  readonly descriptionRecipeMaxLength = 500;

  readonly nameIngredientMinLength = 2;
  readonly nameIngredientMaxLength = 30;
  readonly quantityIngredientMinLength = 2;
  readonly quantityIngredientMaxLength = 30;

  public triggerGuard = true;

  recipeNameErrors: Record<string, string> = {
    required: 'Name is required!',
    minlength: `Name cannot be shorter than ${this.nameRecipeMinLength} characters`,
    maxLength: `Name cannot be longer than ${this.nameRecipeMaxLength} characters`,
    nameExists: 'You have already recipe with this name',
  };

  recipeDescriptionErrors: Record<string, string> = {
    required: 'Description is required!',
    minlength: `Description cannot be shorter than ${this.descriptionRecipeMinLength} characters`,
    maxLength: `Description cannot be longer than ${this.descriptionRecipeMaxLength} characters`,
  };

  recipePreparationTimeErrors: Record<string, string> = {
    required: 'Preparation time is required!',
  };

  recipePreviewErrors: Record<string, string> = {
    required: 'Preview image is required!',
  };

  ingredientNameErrors: Record<string, string> = {
    required: 'Name is required!',
    minlength: `Name cannot be shorter than ${this.nameIngredientMinLength} characters`,
    maxLength: `Name cannot be longer than ${this.nameIngredientMaxLength} characters`,
  };

  ingredientQuantityErrors: Record<string, string> = {
    required: 'Quantity is required!',
    minlength: `Quantity cannot be shorter than ${this.quantityIngredientMinLength} characters`,
    maxLength: `Quantity cannot be longer than ${this.quantityIngredientMaxLength} characters`,
  };

  private _form = this.formBuilder.group({
    images: this.formBuilder.group({
      preview: ['assets/recipes/spaghetti-pomodoro.jpg', Validators.required],
    }),
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(this.nameRecipeMinLength),
        Validators.maxLength(this.nameRecipeMaxLength),
      ],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(this.descriptionRecipeMinLength),
        Validators.maxLength(this.descriptionRecipeMaxLength),
      ],
    ],
    preparationTimeInMinutes: [0, Validators.required],
    ingredients: this.formBuilder.array<
      FormGroup<{
        name: FormControl<string>;
        quantity: FormControl<string>;
      }>
    >([], [Validators.required, Validators.minLength(2)]),
  });

  get ingredients() {
    return this._form.controls.ingredients;
  }

  get form() {
    return this._form;
  }

  public setForm(recipeEntity: RecipiesOverview) {
    this.form.patchValue(recipeEntity);
  }

  public addIngredient(ingredient?: IngredientOverview) {
    this.ingredients.push(this.createIngredient(ingredient));
  }

  private createIngredient(ingredient?: IngredientOverview) {
    return this.formBuilder.group({
      name: [
        ingredient?.name ?? '',
        [
          Validators.required,
          Validators.minLength(this.nameIngredientMinLength),
          Validators.maxLength(this.nameIngredientMaxLength),
        ],
      ],
      quantity: [
        ingredient?.quantity ?? '',
        [
          Validators.required,
          Validators.minLength(this.quantityIngredientMinLength),
          Validators.maxLength(this.quantityIngredientMaxLength),
        ],
      ],
    });
  }
}
