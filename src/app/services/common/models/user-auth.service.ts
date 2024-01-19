import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custome-toastr.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from '../../../contracts/users/token/token';
import { Login_User_Response } from '../../../contracts/users/login_user_response';
import { Login_User_Request } from '../../../entities/login_user_request';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomeToastrService) { }


  async login(loginUser: Login_User_Request, callBackFunction?: () => void): Promise<any> {
    const obsLoginUser: Observable<Login_User_Request | Login_User_Response> = this.httpClientService.post<any | Login_User_Request>({
      controller: "auth",
      action: "login"
    }, loginUser);

    const response: Login_User_Response = await firstValueFrom(obsLoginUser) as Login_User_Response;
    if (response.success) {

      localStorage.setItem("accessToken", response.token.accessToken);
      this.toastrService.message(response.message, "Giriş Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight, timeOut: 2000 })
    } else {
      this.toastrService.message(response.message, "Başarısız", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
    }
    callBackFunction();
  }


  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const obsGoogleUser: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller: "auth",
      action: "google-login"
    }, user);

    const response: TokenResponse = await firstValueFrom(obsGoogleUser) as TokenResponse;
    //debugger;
    if (response.token.accessToken) {
      localStorage.setItem("accessToken", response.token.accessToken);
      this.toastrService.message("Google Login Success", "Succeded", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight, timeOut: 2000 })
    } else {
      this.toastrService.message("Google Login Error", "Error", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
    }
    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const obsFacebookUser: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller: "auth",
      action: "facebook-login"
    }, user);

    const response: TokenResponse = await firstValueFrom(obsFacebookUser) as TokenResponse;
    //debugger;
    if (response.token.accessToken) {
      localStorage.setItem("accessToken", response.token.accessToken);
      this.toastrService.message("Facebook Login Success", "Succeded", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight, timeOut: 2000 })
    } else {
      this.toastrService.message("Facebook Login Error", "Error", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
    }
    callBackFunction();
  }

}
