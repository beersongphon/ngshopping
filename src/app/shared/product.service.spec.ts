import { fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { environment } from './../../environments/environment';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductService
      ],
    });
    service = TestBed.get(ProductService);
    httpMock = TestBed.get(HttpTestingController);
  });

  // it('should getShop', fakeAsync(() => {
  //   service.getShop().subscribe((posts: any) => {
  //     expect(posts.length).toBe(3);
  //   });
  //   expect(httpMock.expectOne(environment.apiUrl + '/api_get_product.php').request.method).toBe("GET");
  //   flush();
  //   // httpMock.verify();
  // }));

  it('should getProduct', fakeAsync(() => {
    service.getProduct({}).subscribe((posts: any) => {
      expect(posts.length).toBe(3);
    });
    expect(httpMock.expectOne(environment.apiUrl + '/api_get_product.php').request.method).toBe("POST");
    flush();
    // httpMock.verify();
  }));

  // it('should getProductDetail', fakeAsync(() => {
  //   let params = {
  //     id: 1,
  //     title: 'test'
  //   }
  //   service.getProductDetail(1, 'test').subscribe((posts: any) => {
  //     expect(posts.length).toBe(3);
  //   });
  //   expect(httpMock.expectNone(environment.apiUrl + '/api_get_product_detail.php', Object({ params })));
  //   flush();
  //   // httpMock.verify();
  // }));

  it('should getProductDetailImage', fakeAsync(() => {
    let params = {
      id: 1
    }
    service.getProductDetailImage(1).subscribe((posts: any) => {
      expect(posts.length).toBe(3);
    });
    expect(httpMock.expectNone(environment.apiUrl + '/api_get_product_detail_image.php', Object({ params })));
    flush();
    // httpMock.verify();
  }));
});
