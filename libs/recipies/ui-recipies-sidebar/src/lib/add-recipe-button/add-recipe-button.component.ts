import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cook-it-add-recipe-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './add-recipe-button.component.html',
  styleUrls: ['./add-recipe-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRecipeButtonComponent {

  constructor(private router: Router) {}

  public navigate() {
    this.router.navigateByUrl("recipe-list/add");
  }
}
