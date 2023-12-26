import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Product } from '../../../contracts/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent extends BaseComponent implements OnInit{

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService){
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallClipRotatePulse);
    this.httpClientService.get<Product[]>({
      controller: "products"
    }).subscribe(data => console.log(data));


    //this.httpClientService.post({
    //  controller: "products"
    //}, {
    //  name: "Kalem",
    //  stock: 100,
    //  price: 23
    //}).subscribe();

    //this.httpClientService.post({
    //  controller: "products"
    //}, {
    //  name: "defter",
    //  stock: 120,
    //  price: 33
    //}).subscribe();

    //this.httpClientService.post({
    //  controller: "products"
    //}, {
    //  name: "silgi",
    //  stock: 140,
    //  price: 53
    //}).subscribe();

    //  this.httpClientService.put({
    //  controller: "products"
    //  }, {
    //    id : "062c0c77-225e-4147-92d7-845017a96e93",
    //  name: "SilgiDüzeltildi",
    //  stock: 13434,
    //  price: 52133
    //}).subscribe();

    //this.httpClientService.delete({
    //  controller: "products"
    //}, "062c0c77-225e-4147-92d7-845017a96e93").subscribe();

    //this.httpClientService.get({
    //  fullEndPoint: "https://jsonplaceholder.typicode.com/posts"
    //}).subscribe(data => console.log(data));
  }
}
