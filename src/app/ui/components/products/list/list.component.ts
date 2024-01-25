import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { List_Product } from '../../../../contracts/list_product';
import { ActivatedRoute } from '@angular/router';
import { FileServiceService } from '../../../../services/common/models/file-service.service';
import { StorageBaseUrl } from '../../../../contracts/storageBaseUrl';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileServiceService) { }

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


  getPaginationArray() {

    this.paginationArray = [];

    if (this.totalPageCount >= 7) {

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
}
