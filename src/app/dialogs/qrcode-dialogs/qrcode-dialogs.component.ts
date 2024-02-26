import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomeToastrService } from '../../services/ui/custome-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from '../../services/common/qr-code.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SpinnerType } from '../../base/base.component';
@Component({
  selector: 'app-qrcode-dialogs',
  templateUrl: './qrcode-dialogs.component.html'
})
export class QrcodeDialogsComponent extends BaseDialog<QrcodeDialogsComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<QrcodeDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
    private qrCodeService: QrCodeService,
    private domSanitizer: DomSanitizer) {
    super(dialogRef);
  }

  qrCodeSafeUrl: SafeUrl;
  async ngOnInit() {
    this.spinner.show(SpinnerType.BallClipRotatePulse);
    const qrCodeBlob: Blob = await this.qrCodeService.generateQrCode(this.data);
    const url: string = URL.createObjectURL(qrCodeBlob);
    this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
    this.spinner.hide(SpinnerType.BallClipRotatePulse);
  }
}
