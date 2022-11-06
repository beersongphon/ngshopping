import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: any[] = [];
  image: any[] = [];
  pageNo: object | undefined;
  sub: Subscription | undefined;

  search: string = "";

  currentPage: number = 1;

  constructor(private apiService: ApiService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    let body = { txtSearch: this.search }
    this.sub = this.productService.getCategory(body).subscribe(
      (products) => {
        // this.product = products;
        this.category = this.addPageNo(products);
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
