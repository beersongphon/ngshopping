import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from './../shared/cart.service';
import { ApiService } from './../shared/api.service';
import { Product } from '../shared/product.model';
import { ProductService } from './../shared/product.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {

  productItem: any;
  id: number = 1;
  title: string = '';
  // productdetail?: any;
  images?: any;
  srcImage = environment.imageUrl;

  productAdded: any | null;

  product: Product[] = [];

  constructor(private cartService: CartService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.title = this.route.snapshot.paramMap.get('title') || '';
    this.getProduct();
    // this.getProductDetail(this.id, this.title);
    this.productService.getProductDetail(this.id, this.title);
    // this.getProductDetailImage();
  }

  getProduct(): void {
    let body: any = [];
    this.productService.getShop(body).subscribe({
      next: (data) => {
        this.product = data;
        this.product = this.product.map((item) => ({
          ...item,
          img_product: environment.imageUrl + item.img_product
        }));
        for (let i = 0; i < this.product.length; i++) {
          let element = this.product[i].images;
          element = element.map((item: any) => ({
            ...item,
            img_product: environment.imageUrl + item.img_product,
          }));
          this.product[i] = Object.assign(this.product[i], { images: element });
        }
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

  addToCart(product: Product, quantity: number): void {
    this.cartService.add(product, quantity);
    this.productAdded = product;
    this.router.navigateByUrl('/cart');
  }

  clearAdd(): void {
    this.productAdded = null;
  }

  getProductDetailImage(): void {
    this.productService.getProductDetailImage(this.id).subscribe({
      next: (data) => {
        this.images = data['data'];
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
}
