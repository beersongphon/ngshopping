import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  searchProduct: any;

  constructor(public productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  getShop(): void {
    let body: any = [];
    if (this.productService.searchProduct) {
      body = [{
        txtSearch: this.productService.searchProduct
      }];
    }
    this.productService.getShop(body);
    this.router.navigate(['/shop']);
  }
}
