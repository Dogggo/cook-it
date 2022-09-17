import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';

import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  RecipiesState,
  RecipiesEntity,
  getAllRecipies,
  RecipiesModule,
} from '@cook-it/recipies';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';

@Component({
  selector: 'cook-it-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  recipies$: Observable<RecipiesEntity[]> = this.store.select<RecipiesEntity[]>(getAllRecipies);

  constructor(private store: Store<RecipiesState>) {}
}

const materialModules = [MatSidenavModule];

 const routes: Route[] = [
  { path: 'recipe-list', component: SidenavComponent },
];

@NgModule({
  imports: [CommonModule, ...materialModules, RecipiesModule, HttpClientModule, RouterModule.forChild(routes)],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
})
export class SidenavComponentModule {}
