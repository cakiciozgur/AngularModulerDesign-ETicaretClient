import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { ActivatedRoute } from '@angular/router';
import { FileServiceService } from '../../../../services/common/models/file-service.service';
import { StorageBaseUrl } from '../../../../contracts/storageBaseUrl';
import { BasketService } from '../../../../services/common/models/basket.service';
import { List_Product } from '../../../../contracts/product/list_product';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Create_Basket_Item } from '../../../../contracts/basket/create_basket_item';
import { CustomeToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/ui/custome-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileServiceService,
    private basketService: BasketService,
    private toastrService: CustomeToastrService,
    spinner: NgxSpinnerService)
  {
    super(spinner)
  }

  productList: List_Product[];
  currentPageNo: number;
  totalCount: number = 0;
  totalPageCount: number = 0;
  pageSize: number = 8;
  paginationArray: number[] = [];
  xyz: number;
  storageBaseUrl: StorageBaseUrl;
  async ngOnInit()
  {
    this.storageBaseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params =>
    {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data: { totalCount: number; products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize, () => { }, errorMessage => {
        // Handle error if needed
      });

      data.products.forEach((p, i) => {
        p.showcaseImage = p.images?.find(f => f.showcase)?.path || "";

      });

      this.totalCount = data.totalCount;
      this.productList = data.products;
      this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);

      this.getPaginationArray();

    });
  }


  getPaginationArray()
  {
    this.paginationArray = [];

    if (this.totalPageCount >= 7)
    {

      if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= 7; i++) {
          this.paginationArray.push(i);
        }
      }
      else if (this.currentPageNo + 3 >= this.totalPageCount) {
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
          this.paginationArray.push(i);
        }
      }
      else {
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
          this.paginationArray.push(i);
        }
      }

    }
    else {

      for (let i = 1; i <= this.totalPageCount; i++) {
        this.paginationArray.push(i);
      }

    }
  }

  async addToBasket(product: List_Product) {
    this.showSpinner(SpinnerType.BallClipRotatePulse);
    let item: Create_Basket_Item = new Create_Basket_Item();
    item.productId = product.id;
    item.qty = 1;
    await this.basketService.add(item);
    this.hideSpinner(SpinnerType.BallClipRotatePulse);
    this.toastrService.message(`${product.name} sepete eklenmiştir`, "Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight, timeOut:3000 });
  }
}
