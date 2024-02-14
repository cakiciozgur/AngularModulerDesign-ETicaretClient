import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/common/models/order.service';
import { Single_Order } from '../../contracts/order/single_order';
import { DialogService } from '../../services/common/dialog.service';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../compete-order-dialog/complete-order-dialog.component';
import { OrderDetailDialogState } from './order-detail-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custome-toastr.service';
import { AlertifyService } from '../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';


@Component({
    selector: 'app-order-detail-dialog',
    templateUrl: './order-detail-dialog.component.html',
    styleUrl: './order-detail-dialog.component.scss'
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

    constructor(
        dialogRef: MatDialogRef<OrderDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
      private orderService: OrderService,
      private dialogService: DialogService,
      private toastrService: CustomeToastrService,
      private spinner: NgxSpinnerService
    ) {
        super(dialogRef);
    }

    completeOrderState: any = false;

    singleOrder: Single_Order;
    totalPrice: number;
    async ngOnInit(): Promise<void> {
        this.singleOrder = await this.orderService.getOrderById(this.data as string);
      this.dataSource = this.singleOrder.basketItems;
      debugger;
        this.totalPrice = this.singleOrder.basketItems.map((basketItem, index) => basketItem.price * basketItem.quantity).reduce((price, current) => price + current);
    }

    displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
    dataSource = [];
    clickedRows = new Set<any>();

    completeOrder(id: string) {
      this.dialogService.openDialog({
          componentType: CompleteOrderDialogComponent,
          data: CompleteOrderState.Yes,
        afterClosed: async () => {
          this.spinner.show(SpinnerType.Timer);
          await this.orderService.completeOrder(id,
            () => {
              this.toastrService.message("Sipariş Başarıyla Tamamlanmıştır!", "Başarılı", { timeOut: 2000, messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
            }
          )
          this.spinner.hide(SpinnerType.Timer);
        }
      });
    }
}
