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
}
