import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit, OnDestroy {

  brand: any[] = [];
  image: any[] = [];
  pageNo: object | undefined;
  sub: Subscription | undefined;

  search: string = "";

  currentPage: number = 1;

  constructor(private apiService: ApiService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand(): void {
    let body = { txtSearch: this.search }
    this.sub = this.productService.getBrand(body).subscribe(
      (products) => {
        // this.product = products;
        this.brand = this.addPageNo(products);
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
