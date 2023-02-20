import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cook-it-recipies-utils-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipies-utils-config.component.html',
  styleUrls: ['./recipies-utils-config.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipiesUtilsConfigComponent {}
