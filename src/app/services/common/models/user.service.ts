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
import { List_User } from '../../../contracts/users/list_user';

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

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error) => void){
    const obsUser: Observable<any> = this.httpClientService.post({
      controller: "users",
      action : "update-password"
    }, { userId: userId, resetToken: resetToken, password: password, passwordConfirm: passwordConfirm });

    const promiseData: Promise<any> = firstValueFrom(obsUser);

    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));

    await promiseData;
  }

  async getAllUsers(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalUserCount: number; users: List_User[] }> {

    const obs: Observable<{ totalUserCount: number; users: List_User[] }> = this.httpClientService.get({

      controller: "users",
      queryString: `page=${page}&size=${size}`

    });

    return await firstValueFrom(obs);
  }

  async assignRoleUser(roles: string[], id: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const obs: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "assign-role-to-user"
    }, { roles: roles, Id: id})

    const promiseData = obs.subscribe({
      next: successCallBack,
      error: errorCallBack
    });

    await promiseData;
  }
  async getRolesToUser(userId: string, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
    const obs: Observable<{ roles: string[] }> = this.httpClientService.get({
      controller: "users",
      action: "get-roles-to-user"
    }, userId);

    const promiseData = firstValueFrom(obs);
    promiseData.then(successCallBack).catch(errorCallBack);

    return (await promiseData).roles;
  }
}
