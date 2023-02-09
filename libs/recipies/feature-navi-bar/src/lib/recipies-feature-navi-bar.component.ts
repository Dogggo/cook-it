import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NaviBarService } from './service/navi-bar.service';
import { DomSanitizer } from '@angular/platform-browser';

const angularMaterialModules = [
  MatToolbarModule,
  MatIconModule,
  MatSlideToggleModule,
];

@Component({
  selector: 'cook-it-recipies-feature-navi-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...angularMaterialModules],
  templateUrl: './recipies-feature-navi-bar.component.html',
  styleUrls: ['./recipies-feature-navi-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipiesFeatureNaviBarComponent {
  toggleControl = new FormControl(false);

  constructor(
    private naviBarService: NaviBarService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'angular',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/angular.svg')
    );
  }

  toggleDarkTheme(checked: boolean) {
    this.naviBarService.setDarkTheme(checked);
  }
}
