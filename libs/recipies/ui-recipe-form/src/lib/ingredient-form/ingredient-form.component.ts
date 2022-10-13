import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormState } from '../form.state';

const materialModules = [MatInputModule, MatButtonModule];

@Component({
  selector: 'cook-it-ingredient-form[form]',
  standalone: true,
  imports: [CommonModule, ...materialModules, ReactiveFormsModule],
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientFormComponent {

  constructor(private formState: FormState) {}

  @Input()
  form!: FormGroup;

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get quantityControl(): FormControl {
    return this.form.get('quantity') as FormControl;
  }

  get state() {
    return this.formState;
  }
}
