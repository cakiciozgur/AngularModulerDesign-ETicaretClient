import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { List_Product } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  productList: List_Product[];
  currentPageNo: number;
  totalCount: number = 0;
  totalPageCount: number;
  pageSize: number = 8;
  paginationArray: number[] = [];

  ngOnInit()
  {
    this.activatedRoute.params.subscribe(async params =>
    {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data: { totalCount: number; products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize, () => { }, errorMessage => {
        // Handle error if needed
      });
      this.totalCount = data.totalCount;
      this.productList = data.products;
      this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);

      this.getPaginationArray();

    });
  }

  getPaginationArray(){
    this.paginationArray = [];
    if (this.currentPageNo - 3 <= 0) {
      debugger;
      for (let i = 1; i <= 7; i++) {
        this.paginationArray.push(i);
      }
    }
    else if (this.currentPageNo + 3 >= this.totalPageCount) {
      debugger;
      for (let i = this.totalPageCount - 6 > 0 ? this.totalPageCount : 1; i <= this.totalPageCount; i++) {
        this.paginationArray.push(i);
      }
    }
    else {
      for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
        this.paginationArray.push(i);
      }
    }
  }
}
