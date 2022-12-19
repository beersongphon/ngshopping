import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

/**
 * Responsible for calculating costs based on the products in the user's cart.
*/
@Injectable({
  providedIn: 'root'
})
export class CartCalculator {

  calculateSubTotal(cartService: CartService) {
    let sum = 0;
    for (let selection of cartService.selections) {
      if (selection.product.product_price && selection.product.product_discount > 0) {
        sum += selection.product.product_price * (1 - selection.product.product_discount/100) * selection.quantity
      } else {
        sum += selection.product.product_price * selection.quantity;
      }
    }
    return sum;
  }
}
