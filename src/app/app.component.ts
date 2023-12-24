import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custome-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService : CustomeToastrService)
  {
    toastrService.message('Hello world!', 'Toastr fun!',{messageType:ToastrMessageType.Success, position: ToastrPosition.BottomFullWidth, timeOut:3000});

    toastrService.message('Hello world!', 'Toastr fun!',{messageType:ToastrMessageType.Warning, position: ToastrPosition.TopLeft, timeOut:2000});

    toastrService.message('Hello world!', 'Toastr fun!',{messageType:ToastrMessageType.Info, position: ToastrPosition.TopCenter, timeOut:4000});

    toastrService.message('Hello world!', 'Toastr fun!',{messageType:ToastrMessageType.Error, position: ToastrPosition.TopRight, timeOut:5000});
  }

}

