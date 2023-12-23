import { Component } from '@angular/core';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custome-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService : CustomeToastrService)
  {
    toastrService.message('Hello world!', 'Toastr fun!',{messageType:ToastrMessageType.Success, position: ToastrPosition.BottomLeft});

    toastrService.message('Hello world!', 'Toastr fun!',{messageType:ToastrMessageType.Warning, position: ToastrPosition.BottomLeft});

    toastrService.message('Hello world!', 'Toastr fun!',{messageType:ToastrMessageType.Info, position: ToastrPosition.BottomLeft});

    toastrService.message('Hello world!', 'Toastr fun!',{messageType:ToastrMessageType.Error, position: ToastrPosition.BottomLeft});
  }
}
