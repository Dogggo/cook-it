import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

const materialModules = [MatMenuModule, MatButtonModule, MatIconModule];

@Component({
  selector: 'cook-it-top-bar[title][selectedOption]',
  standalone: true,
  imports: [CommonModule, ...materialModules, FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {

  @Input()
  title!: string;

  @Input()
  selectedOption!: string;

  @Output()
  deleteRecipe = new EventEmitter<string>();

  constructor(private route: ActivatedRoute, private router: Router) {}
  
  public navigateToEdit() {
    this.router.navigateByUrl(`${ this.route.snapshot.params['id']}/edit`)
  }

  public navigateToPreview() {
    this.router.navigateByUrl(`${ this.route.snapshot.params['id']}`)
  }

  public remove() {
    this.deleteRecipe.emit(this.route.snapshot.params['id']);
  }
}
