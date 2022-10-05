import { Component, OnInit } from '@angular/core';
import { CartService } from './../shared/cart.service';
import { CartCalculator } from './../shared/cart-calculator';
import { Product } from '../shared/product.model';
import { ProductSelection } from './../shared/product-selection';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  image: String = "http://localhost/api_shopping/upload/";

  max: number = 9

  constructor(public cart: CartService, private cartCalculator: CartCalculator) { }

  ngOnInit(): void {
  }

  checkStock(selection: any) {
    if (selection== 0) {
      // สินค้าหมด
      // selection.quantity = selection.product.product_quantity
      // console.log(selection.quantity = selection.product.product_quantity);
    } else if (selection <= 2) {
      // สินค้ากำลังจะหมด
      2
      // selection.product.product_quantity = selection.product.product_quantity
      // console.log(selection.product.product_quantity = selection.quantity);
    } else {
      // เหลือ > 1 ชิ้น
      // selection.product.product_quantity = 10
      // console.log(selection.product.product_quantity = 10);
    }
  }

  subTotal(): number {
    return this.cartCalculator.calculateSubTotal(this.cart);
  }

  remove(product: Product): void {
    this.cart.remove(product);
  }

  empty(): void {
    this.cart.empty();
  }

  onQuantityChange(selection: ProductSelection, quantity: number) {
    if (quantity > 0) {
      selection.quantity = quantity;
    }
    else {
      selection.quantity = 1;
    }
  }
}
