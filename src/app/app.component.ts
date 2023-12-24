import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {
  title = 'ETicaretClient';
  constructor()
  {
  }

    ngOnInit()
  {
    $.get("https://localhost:7034/api/products", data => {console.log(data)})
  }
}

