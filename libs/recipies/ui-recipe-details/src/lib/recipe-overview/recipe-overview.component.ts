import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipiesEntity } from '@cook-it/recipies/data-access';
import { RecipiesSharedModule } from '@cook-it/recipies/shared';

@Component({
  selector: 'cook-it-recipe-overview',
  standalone: true,
  imports: [CommonModule, RecipiesSharedModule],
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeOverviewComponent {
  
  @Input()
  recipe?: RecipiesEntity;
}
