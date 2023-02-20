import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormState } from '../form.state';
@Component({
  selector: 'cook-it-recipe-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent {
  constructor(private formState: FormState) {}

  get nameControl() {
    return this.form.controls.name;
  }

  get descriptionControl() {
    return this.form.controls.description;
  }

  get imagesGroup() {
    return this.form.controls.images;
  }

  get previewControl() {
    return this.imagesGroup.controls.preview;
  }

  get preparationInMinutesControl() {
    return this.form.controls.preparationTimeInMinutes;
  }

  get form() {
    return this.formState.form;
  }

  get state() {
    return this.formState;
  }

  get nameErrorMessage(): string | undefined {
    for (const prop in this.state.recipeNameErrors) {
      if (this.nameControl.errors?.[prop]) {
        return this.state.recipeNameErrors[prop];
      }
    }
    return;
  }

  get descriptionErrorMessage(): string | undefined {
    for (const prop in this.state.recipeDescriptionErrors) {
      if (this.descriptionControl.errors?.[prop]) {
        return this.state.recipeDescriptionErrors[prop];
      }
    }
    return;
  }

  get preparationTimeErrorMessage(): string | undefined {
    for (const prop in this.state.recipePreparationTimeErrors) {
      if (this.preparationInMinutesControl.errors?.[prop]) {
        return this.state.recipePreparationTimeErrors[prop];
      }
    }
    return;
  }

  get previewImageErrorMessage(): string | undefined {
    for (const prop in this.state.recipePreviewErrors) {
      if (this.previewControl.errors?.[prop]) {
        return this.state.recipePreviewErrors[prop];
      }
    }
    return;
  }
}
