import { Component } from '@angular/core';
import { NaviBarService } from '../../../../libs/recipies/shared/src/lib/service/navi-bar.service';

@Component({
  selector: 'cook-it-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDarkTheme$ = this.navBarService.isDarkTheme$;
  constructor(private navBarService: NaviBarService) {}
}
