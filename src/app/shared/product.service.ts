import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable, of } from 'rxjs';
import { ErrorHandler } from './error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';


/**
 * Service for providing Product data to the application.
*/
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productUrl)
  //     .pipe(
  //       catchError(ErrorHandler.handleError<Product[]>([]))
  //     );
  // }

  getShops(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/api_get_product_front-end.php');
  }

  getShop(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_product_front-end.php', formValue, { headers: apiHeader });
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/api_get_product.php');
  }

  getProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_product.php', formValue, { headers: apiHeader });
  }

  getOrderHistory(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_order_history.php', formValue, { headers: apiHeader });
  }

  // getProducts(id: number, title: string): Observable<any> {
  //   const param = {
  //     'id': id.toString(),
  //     'title': title
  //   };
  //   return this.http.get<any>(environment.apiUrl + '/api_get_product_detail.php', { params: param });
  // }

  getProductDetail(id: number, title: string): Observable<any> {
    const param = {
      'id': id.toString(),
      'title': title
    };
    return this.http.get<any>(environment.apiUrl + '/api_get_product_detail.php', { params: param });
  }

  getProductDetailImage(id: number): Observable<any> {
    const param = {
      'id': id.toString()
    };
    return this.http.get<any>(environment.apiUrl + '/api_get_product_detail_image.php', { params: param });
  }

  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/api_get_category.php');
  }
}
