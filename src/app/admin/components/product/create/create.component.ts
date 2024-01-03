import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/create_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertifyService: AlertifyService) {
    super(spinner);
  }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {

    controller: "products",
    action: "upload",
    explanation: "Resimleri sürükleyin veya seçin...",
    isAdminPage: true,
    accept : ".png,.jpg,.jpeg"
  };


  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.Timer);
    const create_product: Create_Product = new Create_Product();

    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    this.productService.createProduct(create_product, () => {
      this.hideSpinner(SpinnerType.Timer);
      this.alertifyService.message("Ürün Başarıyla Eklendi", { messageType: MessageType.Success, position: Position.TopRight, dismissOther: true });
      this.createdProduct.emit(create_product);
    }, errorMessage => {
      this.alertifyService.message(errorMessage, { messageType: MessageType.Error, position: Position.TopRight, dismissOther: true });
    });
  }


}
