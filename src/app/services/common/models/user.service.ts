import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { Login_User_Request } from '../../../entities/login_user_request';
import { Login_User_Response } from '../../../contracts/users/login_user_response';
import { ToastrMessageType, ToastrPosition, CustomeToastrService } from '../../ui/custome-toastr.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { TokenResponse } from '../../../contracts/users/token/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomeToastrService) { }

  async create(user: User): Promise<Create_User>{
    const obsUser: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(obsUser) as Create_User;
  }

  async login(loginUser: Login_User_Request, callBackFunction?: () => void): Promise<any> {
    const obsLoginUser: Observable<Login_User_Request | Login_User_Response> = this.httpClientService.post<any | Login_User_Request>({
      controller: "users",
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
      controller: "users",
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
}
