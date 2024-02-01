import { Component, OnInit, ViewChild } from '@angular/core';
import $ from 'jquery';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custome-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;


  title = 'ETicaretClient';
  constructor(public authService: AuthService, private toastrService: CustomeToastrService, private router: Router, private dynamicLoadComponentService: DynamicLoadComponentService) {
    authService.identityCheck();
  }
  signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("", "Oturum Kapatıldı", { messageType: ToastrMessageType.Warning, position: ToastrPosition.TopRight, timeOut:2000 });
  }

  loadComponent() {
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent, this.dynamicLoadComponentDirective.viewContainerRef);
  }
}

