import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadComponent, FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatCard } from '@angular/material/card';
import { DialogService } from '../../services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { List_Product_Images } from '../../contracts/product/list_product_image';

declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrl: './select-product-image-dialog.component.scss'
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectImageDialogState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService) {
    super(dialogRef);
  }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: "products",
    action: "upload",
    explanation: "Ürün resimlerini sürükleyin veya seçin...",
    isAdminPage: true,
    accept: ".png,.jpg,.jpeg",
    queryString: `id=${this.data}`
  };

  images: List_Product_Images[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallScaleRipple);
    this.getAllImages();
  }


  deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallScaleRipple);
        await this.productService.deleteImage(this.data as string, imageId, () => {
          this.spinner.hide(SpinnerType.BallScaleRipple)
          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(2000);
        });
      }
    })
  }

  panelOpenState = false;

  showCase(imageId: string) {
    this.spinner.show();
    this.productService.changeShowcaseImage(imageId, this.data as string, () => {
      this.spinner.hide();
    })
  }

  async getAllImages(){
    this.images = await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerType.BallScaleRipple));
  }

}

export enum SelectImageDialogState {
  Close
}
