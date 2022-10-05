import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: any[] = [];
  image: any[] = [];
  pageNo: object | undefined;
  sub: Subscription | undefined;

  currentPage: number = 1;

  constructor(private apiService: ApiService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    let search = { txtSearch: "" }
    this.sub = this.productService.getProduct(search).subscribe(
      (products) => {
        // this.product = products;
        this.product = this.addPageNo(products);
      }
    );
  }

  addPageNo(item: any) {
    for (let i = 0; i < item.length; i++) {
      this.pageNo = {
        "pageNo": i + 1
      }
      item[i] = Object.assign(item[i], this.pageNo);
    }
    return item;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
