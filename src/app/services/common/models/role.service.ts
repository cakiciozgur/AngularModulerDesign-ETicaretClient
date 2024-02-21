import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Role } from '../../../contracts/role/list_role';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService: HttpClientService) { }

  async getRoles(page: number, size: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const obs: Observable<any> = this.httpClientService.get({
      controller: "roles",
      queryString: `page=${page}&size=${size}`
    })
    const promiseData = firstValueFrom(obs);

    promiseData.then(successCallBack).catch(errorCallBack);
    return await promiseData;
  }

  getRoleById() {

  }

  async create(name: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const obs: Observable<any> = this.httpClientService.post({
      controller: "roles"
    }, { name: name });

    const promiseData = firstValueFrom(obs);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData as { success: boolean };
  }
}
