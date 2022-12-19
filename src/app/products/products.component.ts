import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../shared/product.service';
import { ApiService } from './../shared/api.service';
import { Product } from './../shared/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products!: Product;

  loginbtn: boolean;
  logoutbtn: boolean;
  name: any;

  id: any;
  title: string = '';

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, private productService: ProductService) {
    apiService.getLoggedInName.subscribe(
      name => this.changeName(name)
    );
    //เช็ค token
    if (this.apiService.isLoggedIn()) {
      this.loginbtn = false;
      this.logoutbtn = true
    }
    else {
      this.loginbtn = true;
      this.logoutbtn = false
    }
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }

  ngOnInit(): void {
  }

  isLogin() {
    return this.apiService.isLoggedIn();
  }

  isAdmin() {
    if (this.apiService.getUserlevel() == '1') {
      return true
    } else {
      return false
    }
  }

  isStaff() {
    if (this.apiService.getUserlevel() == '2') {
      return true
    } else {
      return false
    }
  }

  isCustommer() {
    if (this.apiService.getUserlevel() == '3') {
      return true
    } else {
      return false
    }
  }

  // async click(): Promise<void> {
  //   // if (await this.router.navigate(['/product-single'])) {
  //   //   this.router.navigate(['/product-single', this.products.product_id, this.products.product_name])
  //   // }
  //   await this.router.navigate(['/product-single', this.products.product_id, this.products.product_name])
  // }

  click(): void {
    if (this.loginbtn == true) {
      this.router.navigate(['/login']);
    } else {
      setTimeout(() => {
        this.id = Number(this.route.snapshot.params['id']);
        this.title = this.route.snapshot.params['title'];
        if (this.route.snapshot.routeConfig?.path == 'product-single/:id/:title') {
          this.productService.getProductDetail(this.id, this.title);
          this.router.navigate(['/product-single', this.products.product_id, this.products.product_name]);
        }
        this.router.navigate(['/product-single', this.products.product_id, this.products.product_name]);
      }, 100);
    }
  }

  // click(): void {
  //   this.router.navigate(['/product-single', this.products.product_id, this.products.product_name]).then(() => {
  //     window.location.reload();
  //   });
  // }
}
