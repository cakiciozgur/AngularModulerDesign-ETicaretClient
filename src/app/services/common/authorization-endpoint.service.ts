import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService: HttpClientService) { }

  async assignRoleEndpoint(roles: string[], code: string, menu: string, successCallBack?: () => void, errorCallBack?: (error) => void) {
    const obs : Observable<any> = this.httpClientService.post({
      controller: "AuthorizationEndpoints"
    }, { roles: roles, code: code, menu: menu })

    const promiseData = obs.subscribe({
      next: successCallBack,
      error: errorCallBack
    });

    await promiseData;
  }

  async getRolesToEndpoint(code: string, menu: string, successCallBack?: () => void, errorCallBack?: (error) => void): Promise<string[]> {
    const obs: Observable<any> = this.httpClientService.post({
      controller: "AuthorizationEndpoints",
      action: "get-roles-to-endpoint"
    }, {code: code, menu: menu});

    const promiseData = firstValueFrom(obs);
    promiseData.then(successCallBack).catch(errorCallBack);

    return (await promiseData).roles;
  }
}
