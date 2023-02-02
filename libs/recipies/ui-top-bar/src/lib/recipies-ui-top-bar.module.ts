import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  imports: [CommonModule, TopBarComponent],
  exports: [TopBarComponent],
})
export class RecipiesUiTopBarModule {}
