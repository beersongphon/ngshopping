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

  private productUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productUrl)
  //     .pipe(
  //       catchError(ErrorHandler.handleError<Product[]>([]))
  //     );
  // }

  getShop(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/api_get_product.php');
  }

  getProduct(formValue: any): Observable<any[]>{
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_product.php', formValue, { headers: apiHeader });
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
}
