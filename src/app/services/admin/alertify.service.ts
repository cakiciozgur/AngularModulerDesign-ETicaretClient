import { Injectable } from '@angular/core';
declare var alertify: any;


@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  //message(message:string, messageType: MessageType, position: Position, delay: number = 1, dismissOther: boolean = false)
  message(message:string, alertifyOptions: Partial<AlertifyOptions>)
  {
    alertify.set('notifier','delay', alertifyOptions.delay);
    alertify.set('notifier','position', alertifyOptions.position);
    const msj = alertify[alertifyOptions.messageType](message);
    if(alertifyOptions.dismissOther){
      msj.dismissOthers();
    }
  }
  dissmissAll(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomLeft;
  delay: number = 3;
  dismissOther: boolean = false;
}

export enum MessageType{
  Error = "error",
  Message = "message",
  Notify  = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position{
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft  = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft= "bottom-left"
}