import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomeToastrService {

  constructor(private toastr: ToastrService) { }

  message(message: string, title: string, toastrOptions: Partial<ToastrOptions>){
    this.toastr[toastrOptions.messageType](message,title,{ positionClass: toastrOptions.position, disableTimeOut:'extendedTimeOut', closeButton: true});
  }
}

export class ToastrOptions{
  messageType: ToastrMessageType = ToastrMessageType.Info;
  position: ToastrPosition = ToastrPosition.BottomLeft;
}

export enum ToastrMessageType{
  Error = "error", 
  Info = "info",
  Success  = "success",
  Warning = "warning"
}

export enum ToastrPosition{
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter= "toast-top-center",
  BottomCenter= "toast-bottom-center"
}

