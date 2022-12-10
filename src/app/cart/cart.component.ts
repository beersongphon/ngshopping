import { Component, OnInit } from '@angular/core';
import { CartService } from './../shared/cart.service';
import { CartCalculator } from './../shared/cart-calculator';
import { Product } from '../shared/product.model';
import { ProductSelection } from './../shared/product-selection';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  srcImage = environment.imageUrl;

  max: number = 9;
  isDisabledValueLimit = false;

  constructor(public cart: CartService, private cartCalculator: CartCalculator) { }

  ngOnInit(): void {
    for (let index = 0; index < this.cart.selections.length; index++) {
      this.onQuantityChange(this.cart.selections[index], this.cart.selections[index].quantity)
    }
  }

  checkStock(selection: any) {
    if (selection == 0) {
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
    selection = Object.assign(selection, { quantity: quantity });
    if (quantity > 0) {
      if (quantity < selection.product.product_quantity || quantity == selection.product.product_quantity) {
        this.isDisabledValueLimit = false;
        selection.quantity = quantity;
      } else {
        selection.quantity = quantity;
        this.isDisabledValueLimit = true;
      }
    }
    else {
      this.isDisabledValueLimit = true;
      selection.quantity = 1;
    }
  }
}
