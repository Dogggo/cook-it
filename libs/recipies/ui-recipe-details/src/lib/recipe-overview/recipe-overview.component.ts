import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipiesOverview } from '../model/recipes-overview.interface';
import { RecipiesUtilsPipesModule } from '@cook-it/recipies/utils-pipes';

@Component({
  selector: 'cook-it-recipe-overview[recipe]',
  standalone: true,
  imports: [CommonModule, RecipiesUtilsPipesModule],
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeOverviewComponent {
  @Input()
  recipe?: RecipiesOverview;
}
