import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipiesOverview } from '../model/recipes-overview.interface';
import { RecipiesSharedModule } from '@cook-it/recipies/shared';

@Component({
  selector: 'cook-it-recipe-overview[recipe]',
  standalone: true,
  imports: [CommonModule, RecipiesSharedModule],
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeOverviewComponent {
  @Input()
  recipe?: RecipiesOverview;
}
