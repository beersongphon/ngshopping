import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { ProductSelection } from './product-selection';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  selections: ProductSelection[] = [];

  constructor(private http: HttpClient) { }

  add(product: Product, quantity: number): void {
    const existing = this.selections.find(existingSelection => existingSelection.product.product_id === product.product_id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.selections.push({ product: product, quantity: quantity });
    }
  }

  changeQuantity(product: Product, quantity: number): void {
    // we'll handle changing a quantity for a product not yet in the cart gracefully.
    // just add it to the cart and set the quantity rather than throwing an error.
    const existing = this.selections.find(existingSelection => existingSelection.product.product_id === product.product_id);
    if (existing) {
      existing.quantity = quantity;
    } else {
      this.selections.push({ product: product, quantity: quantity });
    }
  }

  remove(product: Product): void {
    this.selections = this.selections.filter(currentSelection => currentSelection.product.product_id !== product.product_id);
  }

  empty(): void {
    this.selections = [];
  }

  count(): number {
    return this.selections.map((selection) => selection.quantity).reduce((sum, quantity) => sum += quantity, 0);
  }

  insertOrder(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_insert_order.php', formValue, { headers: apiHeader });
  }

  insertOrderDetail(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any[]>(environment.apiUrl + '/api_insert_order_detail.php', formValue, { headers: apiHeader });
  }

  updateCheckStock(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.put<any[]>(environment.apiUrl + '/api_update_checkstock.php', formValue, { headers: apiHeader });
  }

  getOrder(formValue: any): Observable<any[]> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any[]>(environment.apiUrl + '/api_get_order.php', formValue, { headers: apiHeader });
  }

  insertPayment(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_insert_payment.php', formValue, { headers: apiHeader });
  }

  updatePayment(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.put<any>(environment.apiUrl + '/api_update_payment.php', formValue, { headers: apiHeader });
  }

  getOrderUser(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_order_user.php', formValue, { headers: apiHeader });
  }

  getPayment(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/get_payment.php', formValue, { headers: apiHeader });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
