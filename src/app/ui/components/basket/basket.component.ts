import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { BasketService } from '../../../services/common/models/basket.service';
import { List_Basket_Item } from '../../../contracts/basket/list_basket_item';
import { Update_Basket_Item } from '../../../contracts/basket/basketItem_update_quantity';
import { OrderService } from '../../../services/common/models/order.service';
import { Create_Order } from '../../../contracts/order/create_order';
import { create } from 'domain';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custome-toastr.service';
import { Route, Router } from '@angular/router';
import { DialogService } from '../../../services/common/dialog.service';
import { RemoveBasketItemDialogComponent, RemoveBasketItemState } from '../../../dialogs/remove-basket-item-dialog/remove-basket-item-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from '../../../dialogs/shopping-complete-dialog/shopping-complete-dialog.component';

declare var $: any; 
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private basketService: BasketService, private orderService: OrderService, private toastrService: CustomeToastrService, private router: Router, private dialogService: DialogService) {
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

  removeBasketItem(basketItemId: string) {
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType: RemoveBasketItemDialogComponent,
      data: RemoveBasketItemState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallClipRotatePulse);
        await this.basketService.remove(basketItemId);
        $("." + basketItemId).fadeOut(1000, () => { this.hideSpinner(SpinnerType.BallClipRotatePulse) });
      }
    })
  }

  shoppingComplete() {
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallClipRotatePulse);
        const createOrder = new Create_Order();
        createOrder.address = "Bursa";
        createOrder.description = "Desc";
        await this.orderService.create(createOrder);
        this.hideSpinner(SpinnerType.BallClipRotatePulse);
        this.toastrService.message("Sipariş alınmıştır", "Sipariş oluşturuldu!", { messageType: ToastrMessageType.Info, position: ToastrPosition.TopRight, timeOut: 3000 });
        this.router.navigate(["/"]);
      }
    })
  }
}
