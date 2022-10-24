import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../shared/cart.service';
import { ApiService } from './../shared/api.service';
import { Product } from '../shared/product.model';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {

  productItem: any[] = [];
  id: number = 1;
  title: string = '';
  // productdetail?: any;
  images?: any;
  image: String = "http://localhost/api_shopping/upload/";

  productAdded: any | null;

  product: Product[] = [];

  constructor(private cartService: CartService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    // this.productService.getProducts()
    //   .subscribe(products => this.product = products);
    // this.productService.getProducts(this.id, this.title).subscribe(
    //   (products) => {
    //     this.product = products['data']
    //   }
    // );

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.title = this.route.snapshot.paramMap.get('title') || '';
    this.getProducts();
    this.getProductDetail();
    this.getProductDetailImage();
  }

  getProducts(): void {
    this.productService.getShops().subscribe(
      (data) => {
        this.product = data;
      }
    );
  }

  addToCart(product: Product, quantity: number): void {
    this.cartService.add(product, quantity);
    this.productAdded = product;
    this.router.navigateByUrl('/cart');
  }

  clearAdd(): void {
    this.productAdded = null;
  }

  getProductDetail(): void {
    this.productService.getProductDetail(this.id, this.title).subscribe(
      (productsingle) => {
        // console.log(productsingle);
        this.productItem = productsingle['data'];
      }
    );
  }

  getProductDetailImage(): void {
    this.productService.getProductDetailImage(this.id).subscribe(
      (productsingleimage) => {
        // console.log(productsingleimage);
        this.images = productsingleimage['data'];
      }
    );
  }
}
