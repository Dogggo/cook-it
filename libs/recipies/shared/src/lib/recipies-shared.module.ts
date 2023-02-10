import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from './pipe/format-time.pipe';
import { ModalComponent } from './modal/modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const angularMaterial = [MatSnackBarModule];
@NgModule({
  imports: [CommonModule, ModalComponent, FormatTimePipe, ...angularMaterial],
  exports: [FormatTimePipe, ModalComponent],
})
export class RecipiesSharedModule {}
