import { Component, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custome-toastr.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private toastrService: CustomeToastrService,
    private alertifyService: AlertifyService) {

  }
  public files: NgxFileDropEntry[];

  @Input() fileUploadOptions: Partial<FileUploadOptions>

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {

      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {

        fileData.append(_file.name, _file, file.relativePath);
      })
    }

    this.httpClientService.post({
      controller: this.fileUploadOptions.controller,
      action : this.fileUploadOptions.action,
      queryString : this.fileUploadOptions.queryString,
      headers : new HttpHeaders({ "responseType": "blob" })
    }, fileData).subscribe(data => {

      const message: string = "Dosyalar başarıyla yüklenmiştir";

      if (this.fileUploadOptions.isAdminPage) {
        this.alertifyService.message(message, { dismissOther: true, messageType: MessageType.Success, position: Position.TopCenter })
      }
      else {
        this.toastrService.message(message, "Başarılı", { position: ToastrPosition.BottomCenter, messageType: ToastrMessageType.Success })
      }

    }, (errorResponse: HttpErrorResponse) => {

      const errorMessage: string = "Dosyalar yüklenememiştir";

      if (this.fileUploadOptions.isAdminPage) {
        this.alertifyService.message(errorMessage, { dismissOther: true, messageType: MessageType.Error, position: Position.TopCenter })
      }
      else {
        this.toastrService.message(errorMessage, "Hatalı", { position: ToastrPosition.BottomCenter, messageType: ToastrMessageType.Error })
      }
    })
  }
}


export class FileUploadOptions {

  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
