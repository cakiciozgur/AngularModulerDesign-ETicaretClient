import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClientService, RequestParameters } from '../../../../services/common/http-client.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectImageDialogState, SelectProductImageDialogComponent } from '../../../../dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { List_Product } from '../../../../contracts/product/list_product';
import { QrcodeDialogsComponent } from '../../../../dialogs/qrcode-dialogs/qrcode-dialogs.component';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent {

  constructor(private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService,
    private httpClientService: HttpClientService) {
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'photos', 'qrCode', 'edit', 'delete'];

  dataSource: MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts()
  {
    this.showSpinner(SpinnerType.Timer);
    const allProducts: { totalCount: number; products: List_Product[] } = await this.productService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.Timer),
      errorMessage => this.alertifyService.message("Hatalı", { dismissOther: true, messageType: MessageType.Error, position: Position.TopCenter }))

    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }

  async pageChanged() {
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();

  }
  requestParameters : RequestParameters = {
    controller : "products"
  }


  addProductImages(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "1200px"
      },
      afterClosed: () => {

      }
    })
  }

  generateQrCode(id: string) {
    this.dialogService.openDialog({
      componentType: QrcodeDialogsComponent,
      data: id,
      afterClosed: () => {

      }
    })
  }
}
