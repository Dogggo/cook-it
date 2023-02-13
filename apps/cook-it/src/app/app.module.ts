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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SidenavComponentModule,
    ShellModule,
    RouterModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
