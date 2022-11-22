import { fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartCalculator } from './cart-calculator';
import { CartService } from './cart.service';
import { Product } from './product.model';

describe('CartCalculator', () => {
  let serviceMock: CartService;
  let httpMock: HttpTestingController;
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
        CartCalculator,
        CartService
      ],
    });
    serviceMock = TestBed.get(CartService);
    httpMock = TestBed.get(HttpTestingController);
  });

  // const product1 = new Product();
  // product1.id = 1;
  // product1.price = 4.50;
  // const product2 = new Product();
  // product2.id = 2;
  // product2.price = 2.75;

  it('should create an instance', () => {
    expect(new CartCalculator()).toBeTruthy();
  });

  it('should calculate zero subTotal for empty cart', () => {
    expect(new CartCalculator().calculateSubTotal(serviceMock)).toBeCloseTo(0, 2);
  });

  it('should calculate subTotal for cart with one product', () => {
    serviceMock.add(product, 2);
    expect(new CartCalculator().calculateSubTotal(serviceMock)).toBeCloseTo(60);
    // expect(new CartCalculator().calculateSubTotal(serviceMock)).toBeCloseTo(9, 2);
  });

  it('should calculate subTotal for cart with multiple products', () => {
    serviceMock.add(product, 2);
    serviceMock.add(product, 3);
    expect(new CartCalculator().calculateSubTotal(serviceMock)).toBeCloseTo(150);
    // expect(new CartCalculator().calculateSubTotal(serviceMock)).toBeCloseTo(17.25, 2);
  });
});
