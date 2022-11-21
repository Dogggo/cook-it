import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from './format-time.pipe';

@NgModule({
  imports: [CommonModule, FormatTimePipe],
  exports: [
    FormatTimePipe
  ],
})
export class RecipiesSharedModule {}
