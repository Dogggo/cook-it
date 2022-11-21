import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from './pipe/format-time.pipe';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [CommonModule, ModalComponent, FormatTimePipe],
  exports: [
    FormatTimePipe,
    ModalComponent
  ],
})
export class RecipiesSharedModule {}
