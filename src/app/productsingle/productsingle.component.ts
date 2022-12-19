import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from './../shared/cart.service';
import { ApiService } from './../shared/api.service';
import { Product } from '../shared/product.model';
import { ProductService } from './../shared/product.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {

  isDisabledValueLimit = false;
  productItem: any;
  id: number = 1;
  title: string = '';
  // productdetail?: any;
  images?: any;
  // srcImage = environment.imageUrl;

  productAdded: any | null;

  product: Product[] = [];

  constructor(private cartService: CartService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.title = this.route.snapshot.paramMap.get('title') || '';
    this.getProduct();
    // this.getProductDetail(this.id, this.title);
    this.productService.getProductDetail(this.id, this.title);
    // this.getProductDetailImage();
  }

  getProduct(): void {
    let body: any = [];
    this.productService.getShop(body);
  }

  addToCart(product: Product, quantity: number): void {
    // if (product.product_price && product.product_discount > 0) {
    //   let discount = product.product_price * (1 - product.product_discount/100);
    //   product = Object.assign(product, { product_price: discount.toString() });
    // }
    this.cartService.add(product, quantity);
    this.productAdded = product;
    this.router.navigateByUrl('/cart');
  }

  onQuantityChange(product: Product, quantity: number) {
    if (quantity > 0) {
      if (quantity < product.product_quantity || quantity == product.product_quantity) {
        this.isDisabledValueLimit = false;
        quantity = quantity;
        // for (let index = 0; index < this.cartService.selections.length; index++) {
        //   console.log(quantity, this.cartService.selections[index].quantity);
        //   if (quantity < this.cartService.selections[index].quantity || quantity == this.cartService.selections[index].quantity) {
        //     this.isDisabledValueLimit = true;
        //     const element = this.cartService.selections[index];
        //     console.log(element);
        //   }
        // }
      } else {
        quantity = quantity;
        this.isDisabledValueLimit = true;
      }
    } else {
      this.isDisabledValueLimit = true;
      quantity = 1;
    }
  }

  clearAdd(): void {
    this.productAdded = null;
  }
}
