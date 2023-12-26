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
  constructor()
  {
  }

}

