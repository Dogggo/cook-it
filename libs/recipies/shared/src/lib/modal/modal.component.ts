import {
  ChangeDetectionStrategy,
  Component,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalInterface } from './modal.interface';

const materialModules = [
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
];

@Component({
  selector: 'cook-it-modal',
  standalone: true,
  imports: [CommonModule, ...materialModules],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  entryComponents: []
})
export class ModalComponent{

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: ModalInterface,
    public modalRef: MatDialogRef<ModalComponent>
  ) {}

  public handleModalSubmit(): void {
    this.modalData.callbackMethod();
  }

  public closeModal(): void {
    this.modalRef.close();
  }

}
