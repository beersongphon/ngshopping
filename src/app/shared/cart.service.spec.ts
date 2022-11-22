import { fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CartService } from './cart.service';
import { environment } from './../../environments/environment';
import { of } from 'rxjs';

import { ProductSelection } from './product-selection';
import { Product } from './product.model';

describe('CartService', () => {
  let serviceMock: CartService;
  let httpMock: HttpTestingController;
  // define some products to be used in various cart tests.
  // let product1: any;
  // product1.id = 1;

  // let product2: any;
  // product2.id = 2;

  let product: any = {
    "product_id": "122",
    "product_name": "product_name",
    "brand_name": "Louis Vuitton",
    "category_name": "กระเป๋าสตางค์",
    "product_date": "2022-11-01 11:55:08",
    "product_price": "30",
    "product_quantity": "30",
    "product_description": "product_description",
    "img_product": "63674cfad4b8f.png",
    "images": [
      {
        "img_pro_id": "689",
        "img_product": "63674cfad4b8f.png"
      },
      {
        "img_pro_id": "690",
        "img_product": "63674cfad7056.png"
      },
      {
        "img_pro_id": "692",
        "img_product": "63674cfadcc71.png"
      }
    ]
  };

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
  //   serviceMock.remove(product)
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

  // it('should getOrder', fakeAsync(() => {
  //   serviceMock.getOrder().subscribe((posts: any) => {
  //     expect(posts.length).toBe(3);
  //   });
  //   expect(httpMock.expectOne(environment.apiUrl + '/api_get_order.php').request.method).toBe("GET");
  //   flush();
  //   // httpMock.verify();
  // }));


  it('should create an instance', () => {
    expect(serviceMock).toBeTruthy();
  });

  it('should initially be empty', () => {
    expect(serviceMock.selections.length).toBe(0);
  });

  it('should add selections', () => {
    // const cart = new Cart();
    serviceMock.add(product, 3);
    // serviceMock.add(pro, 1);
    // check property equality, not reference equality.
    expect(serviceMock.selections).toContain(jasmine.objectContaining({ product: product, quantity: 3 }));
    // expect(serviceMock.selections).toContain(jasmine.objectContaining({ product: pro, quantity: 1 }));
  });

  it('should add quantity to existing product selections', () => {
    // const cart = new Cart();
    serviceMock.add(product, 3);
    serviceMock.add(product, 1);
    expect(serviceMock.selections[0].quantity).toBe(4);
  });

  it('should change quantity for existing product selection', () => {
    // const cart = new Cart();
    serviceMock.add(product, 3);
    serviceMock.changeQuantity(product, 2);
    expect(serviceMock.selections[0].quantity).toBe(2);
  });

  it('should add product when changing quantity for new product', () => {
    serviceMock.changeQuantity(product, 3);
    expect(serviceMock.selections[0].quantity).toBe(3);
  });

  it('should remove selections', () => {
    const selection: ProductSelection = { product: product, quantity: 3 };
    serviceMock.remove(product);
    expect(serviceMock.selections).not.toContain(selection);
  });

  it('should count all product selections and quantities', () => {
    serviceMock.add(product, 2);
    serviceMock.add(product, 1);
    expect(serviceMock.count()).toBe(3);
  });

  it('should be emptied', () => {
    serviceMock.add(product, 2);
    serviceMock.add(product, 1);
    serviceMock.empty();
    expect(serviceMock.selections.length).toBe(0);
  });


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
