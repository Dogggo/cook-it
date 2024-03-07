import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalInterface } from './modal.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materialModules = [
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
];

@Component({
  selector: 'cook-it-recipies-ui-modal',
  standalone: true,
  imports: [CommonModule, ...materialModules],
  templateUrl: './recipies-ui-modal.component.html',
  styleUrls: ['./recipies-ui-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipiesUiModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: ModalInterface,
    public modalRef: MatDialogRef<RecipiesUiModalComponent>
  ) {}

  public handleModalSubmit(): void {
    this.modalData.callbackMethod();
  }

  public closeModal(): void {
    this.modalRef.close();
  }
}
