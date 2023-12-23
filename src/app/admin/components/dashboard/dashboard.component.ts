import { Component, OnInit } from '@angular/core';
import { AlertifyOptions, AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private alertify : AlertifyService) { }

    ngOnInit(): void {
  }
  messageDump(){
    this.alertify.message("selam",{
      messageType: MessageType.Success,
      delay:5,
      position: Position.TopCenter
    });
  }

  messageDismiss(){
    this.alertify.dissmissAll();
  }

  messageDismissOther(){
    this.alertify.message("selam",{
      messageType: MessageType.Success,
      delay:5,
      position: Position.TopCenter,
      dismissOther: true
    });
  }
}
