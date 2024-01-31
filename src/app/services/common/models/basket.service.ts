import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Create_Basket_Item } from '../../../contracts/basket/create_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/basketItem_update_quantity';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }

  async get(): Promise<List_Basket_Item[]> {
    const obs: Observable<List_Basket_Item[]> = this.httpClientService.get({
      controller: "baskets"
    });

    return await firstValueFrom(obs);
  }

  async add(item: Create_Basket_Item): Promise<void> {
    const obs: Observable<any> = this.httpClientService.post({
      controller: "baskets",
    }, item);

    return await firstValueFrom(obs);
  }

  async updateQty(item: Update_Basket_Item): Promise<void> {
    const obs: Observable<any> = this.httpClientService.put({
      controller: "baskets",
    }, item);

    return await firstValueFrom(obs);
  }

  async remove(basketItemId: string): Promise<void> {
    const obs: Observable<any> = this.httpClientService.delete({
      controller: "baskets"
    }, basketItemId);

    return await firstValueFrom(obs);
  }

}
