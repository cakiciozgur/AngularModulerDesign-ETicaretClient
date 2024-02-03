import { Component, Inject, OnDestroy } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

declare var $: any;

@Component({
  selector: 'app-remove-basket-item-dialog',
  templateUrl: './remove-basket-item-dialog.component.html',
  styleUrl: './remove-basket-item-dialog.component.scss'
})
export class RemoveBasketItemDialogComponent extends BaseDialog<RemoveBasketItemDialogComponent> implements OnDestroy {
  constructor(
    dialogRef: MatDialogRef<RemoveBasketItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RemoveBasketItemState) {
    super(dialogRef);
  }

  ngOnDestroy(): void {
    $("#basketModal").modal("show");
  }
}

export enum RemoveBasketItemState {
  Yes, No
}
