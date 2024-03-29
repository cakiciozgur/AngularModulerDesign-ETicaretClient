import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Images } from '../../../contracts/product/list_product_image';
import { Create_Product } from '../../../contracts/product/create_product';
import { List_Product } from '../../../contracts/product/list_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  createProduct(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {

    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((val, index) => {
        val.value.forEach((_v, _index) => {
          message += `${_v}<br>`
        });
      });
      errorCallBack(message);
    });
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number; products: List_Product[] }>
  {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData
      .then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

  async delete(id: string)
  {
     const deleteObs: Observable<any> = this.httpClientService.delete<any>({
       controller: "products"
     }, id)

     await firstValueFrom(deleteObs);
  }

  async readImages(id: string, successCallBack?: () => void): Promise<List_Product_Images[]> {

    const getObservable: Observable<List_Product_Images[]> = this.httpClientService.get<List_Product_Images[]>({
      controller: "products",
      action: "getimages"
    }, id);


    const images: List_Product_Images[] = await firstValueFrom(getObservable);
    successCallBack();

    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObs: Observable<any> = this.httpClientService.delete<any>({
      controller: "products",
      action: "deleteimage",
      queryString: `imageId=${imageId}`
    }, id)

    await firstValueFrom(deleteObs);
    successCallBack();
  }

  async changeShowcaseImage(imageId: string, productId: string, successCallBack?: () => void): Promise<void> {

    const changeShowcaseObs = this.httpClientService.get({
      controller: "products",
      action: "changeshowcaseimage",
      queryString: `imageId=${imageId}&productId=${productId}`
    })

    await firstValueFrom(changeShowcaseObs);
    successCallBack();
  }

  async updateStockQrCodeToProduct(productId: string, stock: number, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const obs: Observable<any> = this.httpClientService.put({
      controller: "products",
      action: "qrcode",
    }, { productId, stock });

    const promiseData = firstValueFrom(obs);

    promiseData.then(successCallBack).catch(errorCallBack);
    return await promiseData as { success: boolean };
  }
}
