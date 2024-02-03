import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from '../../../services/common/signal-r.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-url';
import { AlertifyOptions, AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private signalRService: SignalRService,private alertfyService: AlertifyService) {
    super(spinner);
    //signalRService.start(HubUrls.ProductHub);
    //signalRService.start(HubUrls.OrderHub);
  }

  ngOnInit(): void {
    this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageRecieveFunction, message => {
      this.alertfyService.message(message, { position: Position.TopCenter, messageType: MessageType.Notify })
    });

    this.signalRService.on(HubUrls.OrderHub, ReceiveFunctions.OrderAddedMessageRecieveFunction, message => {
      this.alertfyService.message(message, { position: Position.TopCenter, messageType: MessageType.Notify })
    });
  }

}
