import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from '../../../contracts/order/create_order';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Order } from '../../../contracts/order/list_order';
import { Single_Order } from '../../../contracts/order/single_order';
import { debug, error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) { }


  async create(order: Create_Order) :Promise<void> {
    const obs: Observable<any> = this.httpClientService.post({
      controller: "orders"
    }, order);

    await firstValueFrom(obs);

  }

  async getAllOrders(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; orders: List_Order[] }> {

    const obs: Observable<{ totalCount: number; orders: List_Order[] }> = this.httpClientService.get({

      controller: "orders",
      queryString: `page=${page}&size=${size}`

    });

    return await firstValueFrom(obs);
  }

  async getOrderById(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<Single_Order> {

    const obs: Observable<Single_Order> = this.httpClientService.get({
      controller: "orders",
    },id);

    const promiseData = firstValueFrom(obs);

    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error))

    return await promiseData;
  }

  async completeOrder(id: string, successCallBack?: () => void):Promise<void>{

    const obs: Observable<{ success: boolean }> = this.httpClientService.get({
      controller: "orders",
      action: "complete-order"
    }, id);

    const response: { success } = await firstValueFrom(obs);
    if (response.success) {
      successCallBack();
    }
  }

}
