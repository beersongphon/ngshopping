import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() products: any;

  loginbtn: boolean;
  logoutbtn: boolean;
  name: any;

  srcImage = environment.imageUrl;

  constructor(private apiService: ApiService, private router: Router) {
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

  click(): void {
    this.router.navigate(['/product-single', this.products.product_id, this.products.product_name]).then(() => {
      window.location.reload();
    });
  }
}
