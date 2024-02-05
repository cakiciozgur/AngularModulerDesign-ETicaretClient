import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { HttpClientService, RequestParameters } from '../../../../services/common/http-client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../../../../services/common/models/order.service';
import { List_Product } from '../../../../contracts/product/list_product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { List_Order } from '../../../../contracts/order/list_order';
import { OrderDetailDialogComponent, OrderDetailDialogState } from '../../../../dialogs/order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent {

  constructor(private productService: ProductService,
    private orderService: OrderService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService,
    private httpClientService: HttpClientService) {
    super(spinner)
  }

  displayedColumns: string[] = ['orderCode', 'username', 'totalPrice', 'createdDate', 'orderDetail', 'delete'];

  dataSource: MatTableDataSource<List_Order> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders() {
    this.showSpinner(SpinnerType.Timer);
    const allOrders: { totalCount: number; orders: List_Order[] } = await this.orderService.getAllOrders(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.Timer),
      errorMessage => this.alertifyService.message("Hatalı", { dismissOther: true, messageType: MessageType.Error, position: Position.TopCenter }))

    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
    this.paginator.length = allOrders.totalCount;
  }

  async pageChanged() {
    await this.getOrders();
  }

  async ngOnInit() {
    await this.getOrders();

  }

  showDetail(id: string) {
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id,
      options: {
        width:"750px"
      }
    })
  }
}
