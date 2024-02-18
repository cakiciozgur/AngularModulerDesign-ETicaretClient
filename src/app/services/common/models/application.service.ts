import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Menu } from '../../../contracts/application-config/menu';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) { }


  async getAuthorizeDefinitionEndpoints(): Promise<Menu[]> {
    const obs: Observable<Menu[]> = this.httpClientService.get<Menu[]>({
      controller: "ApplicationServices"
    })

    return await firstValueFrom(obs);
  }

}
