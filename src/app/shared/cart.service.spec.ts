import { fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CartService } from './cart.service';
import { environment } from './../../environments/environment';
import { of } from 'rxjs';

describe('CartService', () => {
  let serviceMock: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CartService
      ],
    });
    serviceMock = TestBed.get(CartService);
    httpMock = TestBed.get(HttpTestingController);
  });

  // it('should getInstitution', fakeAsync(() => {
  //   spyOn(http, "get").and.returnValue(of({}));
  //   service.getInstitution().subscribe(() => {
  //     expect(http.get).toHaveBeenCalledWith(environment.apiUrl + '/api_get_institution_id.php');
  //   });
  //   flush();
  // }));

  // it('should insertOrder', fakeAsync(() => {
  //   spyOn(httpMock, "post").and.returnValue(of({}));
  //   serviceMock.insertOrder({}).subscribe(() => {
  //     expect(httpMock.post).toHaveBeenCalledWith(environment.apiUrl + '/api_insert_order.php', {}, Object({ headers: Object({ 'Content-Type': 'application/json' }) }));
  //   });
  //   flush();
  // }));

  // it('should remove', fakeAsync(() => {
  //   serviceMock.remove({})
  // }));

  it('should empty', fakeAsync(() => {
    serviceMock.empty()
  }));

  it('should count', fakeAsync(() => {
    serviceMock.count()
  }));

  it('should insertOrder', fakeAsync(() => {
    serviceMock.insertOrder({}).subscribe((posts: any) => {
      expect(posts.length).toBe(3);
    });
    expect(httpMock.expectOne(environment.apiUrl + '/api_insert_order.php').request.method).toBe("POST");
    flush();
    // httpMock.verify();
  }));

  it('should insertOrderDetail', fakeAsync(() => {
    serviceMock.insertOrderDetail({}).subscribe((posts: any) => {
      expect(posts.length).toBe(3);
    });
    expect(httpMock.expectOne(environment.apiUrl + '/api_insert_order_detail.php').request.method).toBe("POST");
    flush();
    // httpMock.verify();
  }));

  it('should updateCheckStock', fakeAsync(() => {
    serviceMock.updateCheckStock({}).subscribe((posts: any) => {
      expect(posts.length).toBe(3);
    });
    expect(httpMock.expectOne(environment.apiUrl + '/api_update_checkstock.php').request.method).toBe("PUT");
    flush();
    // httpMock.verify();
  }));

  it('should getOrder', fakeAsync(() => {
    serviceMock.getOrder().subscribe((posts: any) => {
      expect(posts.length).toBe(3);
    });
    expect(httpMock.expectOne(environment.apiUrl + '/api_get_order.php').request.method).toBe("GET");
    flush();
    // httpMock.verify();
  }));

  // it(`should fetch posts as an Observable`, fakeAsync(inject([HttpTestingController, CartService],
  //   (httpClient: HttpTestingController, serviceMock: CartService) => {
  //     const postItem = [
  //       {
  //         "userId": 1,
  //         "id": 1,
  //         "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  //         "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  //       },
  //       {
  //         "userId": 1,
  //         "id": 2,
  //         "title": "qui est esse",
  //         "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  //       },
  //       {
  //         "userId": 1,
  //         "id": 3,
  //         "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
  //         "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  //       }
  //     ];

  //     serviceMock.getOrder()
  //       .subscribe((posts: any) => {
  //         expect(posts.length).toBe(3);
  //       });
  //     let req = httpMock.expectOne(environment.apiUrl + '/api_get_order.php');
  //     expect(req.request.method).toBe("GET");
  //     req.flush(postItem);
  //     httpMock.verify();
  //   })));
});
