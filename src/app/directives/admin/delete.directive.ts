import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService, RequestParameters } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/common/dialog.service';

declare var $: any
@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    const image = _renderer.createElement("img");
    image.setAttribute("src", "../../../../../assets/delete.png");
    image.setAttribute("style", "cursor:pointer;");
    image.width = 30;
    image.height = 30;
    _renderer.appendChild(element.nativeElement, image);
  }
  @Input() id: string;
  @Input() requestParameters: RequestParameters;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        debugger
        this.spinner.show(SpinnerType.Timer);
        const td: HTMLTableCellElement = this.element.nativeElement;
        await this.httpClientService.delete({ controller: this.requestParameters.controller }, this.id).subscribe(data => {
          $(td.parentElement).animate({
            opacity: 0,
            left: "+= 50",
            height: "toggle"
          }, 700, () => {
            this.callback.emit();
            this.alertifyService.message(`${this.requestParameters.controller} başarıyla silinmiştir`, { dismissOther: true, messageType: MessageType.Success, position: Position.TopCenter })
          });
        }, (errorResponse: HttpErrorResponse) => {
          this.spinner.hide(SpinnerType.Timer);
          this.alertifyService.message(errorResponse.message, { dismissOther: true, messageType: MessageType.Error, position: Position.TopCenter });
        });
      }
    })
  }

  //async onclick() {
  //  this.openDialog(async () => {
  //    this.spinner.show(SpinnerType.Timer);
  //    const td: HTMLTableCellElement = this.element.nativeElement;
  //    await this.productService.delete(this.id);
  //    $(td.parentElement).fadeOut(2000, () => {
  //      this.callback.emit();
  //    });
  //  });
  //}

  //openDialog(afterClosed: any): void {
  //  const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //    width: '250px',
  //    data: DeleteState.Yes
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    if (result == DeleteState.Yes) {
  //      afterClosed();
  //    }
  //  });
  //}
}
