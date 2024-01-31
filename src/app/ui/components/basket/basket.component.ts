import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { BasketService } from '../../../services/common/models/basket.service';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/basketItem_update_quantity';
declare var $: any; 
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService) {
    super(spinner);
  }

  basketItems: List_Basket_Item[];
  async ngOnInit(): Promise<void> {
    
    this.showSpinner(SpinnerType.BallClipRotatePulse);
    this.basketItems = await this.basketService.get();
    this.hideSpinner(SpinnerType.BallClipRotatePulse);

  }


  async changeQuantity(eventItem: any){
    this.showSpinner(SpinnerType.BallClipRotatePulse);
    const basketItemId = eventItem.target.attributes["id"].value;
    const quantity: number = eventItem.target.value;

    const basketItem: Update_Basket_Item = new Update_Basket_Item();

    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;

    await this.basketService.updateQty(basketItem)

    this.hideSpinner(SpinnerType.BallClipRotatePulse);
  }

  async removeBasketItem(basketItemId: string) {
    this.showSpinner(SpinnerType.BallClipRotatePulse);
    await this.basketService.remove(basketItemId);
    $("." + basketItemId).fadeOut(1000, () => { this.hideSpinner(SpinnerType.BallClipRotatePulse) });
    
  }
}
