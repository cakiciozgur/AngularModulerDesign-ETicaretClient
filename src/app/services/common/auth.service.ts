import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }


  identityCheck() {

    const token: string = (typeof window !== "undefined" && window.localStorage) ? localStorage.getItem("accessToken") : null;
    let expired: boolean = true; // token bitiş süresi => true ise süre dolmuş yeni token almalı (login olmalı)

    try {
      expired = this.jwtHelper.isTokenExpired(token)
    } catch {
      expired: true;
    }
    _isAuthenticated = token != null && !expired;
  }

  get isAuth(): boolean {
    return _isAuthenticated;
  }

}

export let _isAuthenticated: boolean;
