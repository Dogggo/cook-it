import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ShellModule } from '@cook-it/recipies/shell';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SidenavComponentModule } from '@cook-it/recipies/feature-recipe-list';
import { RecipiesFeatureNaviBarComponent } from '../../../../libs/recipies/feature-navi-bar/src';
import { NaviBarService } from '../../../../libs/recipies/feature-navi-bar/src/lib/service/navi-bar.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SidenavComponentModule,
    ShellModule,
    RouterModule,
    RecipiesFeatureNaviBarComponent,
    StoreModule.forRoot([]),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  providers: [NaviBarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
