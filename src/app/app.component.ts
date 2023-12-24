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
  }
}
