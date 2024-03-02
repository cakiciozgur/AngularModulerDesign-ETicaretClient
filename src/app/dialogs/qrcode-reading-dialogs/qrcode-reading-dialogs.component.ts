import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrCodeService } from '../../services/common/qr-code.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { ProductService } from '../../services/common/models/product.service';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custome-toastr.service';
import { SpinnerType } from '../../base/base.component';

declare var $: any;

@Component({
  selector: 'app-qrcode-reading-dialogs',
  templateUrl: './qrcode-reading-dialogs.component.html'
})
export class QrcodeReadingDialogsComponent extends BaseDialog<QrcodeReadingDialogsComponent> implements OnInit, OnDestroy {

  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private qrCodeService: QrCodeService,
    private toastrService: CustomeToastrService,
    private productService: ProductService) {
    super(dialogRef);
  }

  @ViewChild("scanner", { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild("txtStock", { static: true }) txtStock: ElementRef;

  ngOnInit(): void {
    this.scanner.start();
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e) {
    this.spinner.show(SpinnerType.Timer);
    const jsonData = JSON.parse(e[0].value);
    const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;

    this.productService.updateStockQrCodeToProduct(jsonData.Id, parseInt(stockValue),
    () => {
      $("#btnClose").click();
      this.toastrService.message(`${jsonData.Name} Ürünün stoğu ${stockValue}  güncellenmiştir`, "Stok Güncelleme Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight, timeOut: 3000 });
      this.spinner.hide(SpinnerType.Timer);
      },
    () => {

    });
  }
}
