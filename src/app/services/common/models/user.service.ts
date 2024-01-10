import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { Login_User_Request } from '../../../entities/login_user_request';
import { Login_User_Response } from '../../../contracts/users/login_user_response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: User): Promise<Create_User>{
    const obsUser: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(obsUser) as Create_User;
  }

  async login(loginUser: Login_User_Request, callBackFunction?: () => void): Promise<Login_User_Response> {
    const obsLoginUser: Observable<Login_User_Response | Login_User_Request> = this.httpClientService.post<Login_User_Request>({
      controller: "users",
      action: "login"
    }, loginUser);

    return await firstValueFrom(obsLoginUser) as Login_User_Response;
    callBackFunction();
  }
}
