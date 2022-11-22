import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable, of } from 'rxjs';
import { ErrorHandler } from './error-handler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import Swal from 'sweetalert2';


/**
 * Service for providing Product data to the application.
*/
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productItem: any;
  images: any[] = [];

  constructor(private http: HttpClient) { }

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productUrl)
  //     .pipe(
  //       catchError(ErrorHandler.handleError<Product[]>([]))
  //     );
  // }

  getShop(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_product_front-end.php', formValue, { headers: apiHeader });
  }

  getProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_product.php', formValue, { headers: apiHeader });
  }

  getEditProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_edit_product.php', formValue, { headers: apiHeader });
  }

  insertProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_insert_product.php', formValue, { headers: apiHeader });
  }

  updateProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.put<any>(environment.apiUrl + '/api_update_product.php', formValue, { headers: apiHeader });
  }

  deleteProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_delete_product.php', formValue, { headers: apiHeader });
  }

  getImageProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_image_product.php', formValue, { headers: apiHeader });
  }

  uploadImageProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/upload_image.php', formValue, { headers: apiHeader });
  }

  insertImageProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_insert_image_product.php', formValue, { headers: apiHeader });
  }

  deleteImageProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_delete_image_product.php', formValue, { headers: apiHeader });
  }

  getBrand(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_brand.php', formValue, { headers: apiHeader });
  }

  getEditBrand(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_edit_brand.php', formValue, { headers: apiHeader });
  }

  insertBrand(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_insert_brand.php', formValue, { headers: apiHeader });
  }

  updateBrand(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.put<any>(environment.apiUrl + '/api_update_brand.php', formValue, { headers: apiHeader });
  }

  deleteBrand(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_delete_brand.php', formValue, { headers: apiHeader });
  }

  getCategory(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_category.php', formValue, { headers: apiHeader });
  }

  getEditCategory(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_edit_category.php', formValue, { headers: apiHeader });
  }

  insertCategory(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_insert_category.php', formValue, { headers: apiHeader });
  }

  updateCategory(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.put<any>(environment.apiUrl + '/api_update_category.php', formValue, { headers: apiHeader });
  }

  deleteCategory(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_delete_category.php', formValue, { headers: apiHeader });
  }

  getImage(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_image_product.php', formValue, { headers: apiHeader });
  }

  getReportProduct(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_report_product.php', formValue, { headers: apiHeader });
  }

  getReportSale(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_report_sale.php', formValue, { headers: apiHeader });
  }

  getOrderHistory(formValue: any): Observable<any> {
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_order_history.php', formValue, { headers: apiHeader });
  }

  // getProductDetail(id: number, title: string): Observable<any> {
  //   const param = {
  //     'id': id.toString(),
  //     'title': title
  //   };
  //   // return this.http.get<any>(environment.apiUrl + '/api_get_product_detail.php', { params: param });
  //   const apiHeader = { 'Content-Type': 'application/json' };
  //   return this.http.post<any>(environment.apiUrl + '/api_get_product_detail.php', param, { headers: apiHeader });
  // }

  getProductDetail(id: any, title: any): void {
    const param = {
      'id': id.toString(),
      'title': title
    };
    const apiHeader = { 'Content-Type': 'application/json' };
    this.http.post<any>(environment.apiUrl + '/api_get_product_detail.php', param, { headers: apiHeader }).subscribe({
      // this.productService.getProductDetail(this.id, this.title).subscribe({
      next: (data) => {
        this.productItem = data['data'];
        this.images = data['data'].images;
        this.images = this.images.map((item: any) => ({
          ...item,
          img_product: environment.imageUrl + item.img_product,
        }));
        // this.productItem = Object.assign(this.productItem, { img_product: environment.imageUrl + this.productItem.img_product });
        // for (let i = 0; i < this.productItem.images.length; i++) {
        //   let element = this.productItem.images;
        //   this.images[i] = Object.assign({ img_pro_id: element[i].img_pro_id, img_product: environment.imageUrl + element[i].img_product });
        // }
        // this.productItem = Object.assign(this.productItem, { images: this.images });
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          title: (error),
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isDismissed) {
            window.history.back;
          }
        });
      }
    });
  }

  getProductDetailImage(id: number): Observable<any> {
    const param = {
      'id': id.toString()
    };
    // return this.http.get<any>(environment.apiUrl + '/api_get_product_detail_image.php', { params: param });
    const apiHeader = { 'Content-Type': 'application/json' };
    return this.http.post<any>(environment.apiUrl + '/api_get_product_detail_image.php', param, { headers: apiHeader });
  }
}
