import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [MatMenuModule, MatButtonModule, MatIconModule];

@Component({
  selector: 'cook-it-top-bar',
  standalone: true,
  imports: [CommonModule, ...materialModules],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {

  @Input()
  title?: string;

}
