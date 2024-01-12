import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custome-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(public authService: AuthService, private toastrService: CustomeToastrService, private router : Router) {
    authService.identityCheck();
  }
  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("", "Oturum Kapatıldı", { messageType: ToastrMessageType.Warning, position: ToastrPosition.TopRight, timeOut: 2000 });
  }
}

