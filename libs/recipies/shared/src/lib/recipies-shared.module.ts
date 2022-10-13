import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FormatTimePipe } from './pipe/format-time.pipe';

@NgModule({
  imports: [CommonModule, ModalComponent],
  declarations: [
    FormatTimePipe
  ],
  exports: [
    FormatTimePipe,
    ModalComponent
  ],
})
export class RecipiesSharedModule {}
