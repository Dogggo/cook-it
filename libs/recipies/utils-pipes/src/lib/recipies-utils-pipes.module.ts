import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from './pipe/format-time.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const angularMaterial = [MatSnackBarModule];
@NgModule({
  imports: [CommonModule, FormatTimePipe, ...angularMaterial],
  exports: [FormatTimePipe],
})
export class RecipiesUtilsPipesModule {}
