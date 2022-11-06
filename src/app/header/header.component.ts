import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../shared/api.service';
import { CartService } from './../shared/cart.service';
import { CartCalculator } from './../shared/cart-calculator';
import { Product } from '../shared/product.model';
import { ProductSelection } from './../shared/product-selection';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginbtn: boolean;
  logoutbtn: boolean;
  name: any;
  permission_id: any = true;

  image: String = "http://localhost/api_shopping/upload/";

  constructor(private apiService: ApiService, public cart: CartService, private cartCalculator: CartCalculator, private router: Router) {
    apiService.getLoggedInName.subscribe(
      name => this.changeName(name)
    );
    //เช็ค token
    if (this.apiService.isLoggedIn()) {
      console.log("loggedin");
      this.loginbtn = false;
      this.logoutbtn = true
    }
    else {
      this.loginbtn = true;
      this.logoutbtn = false
    }
  }

  //เปลี่ยนปุ่มสำหรับเข้าสู่ระบบ
  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.apiService.getUser().subscribe({
      next: (data) => {
        if (data.user_firstname) {
          this.name = data.user_firstname + " " + data.user_lastname;
          this.permission_id = data.permission_id;
        } else {
          console.log(this.permission_id);
        }
      }, error: (error) => {
        this.name = "";
      }
    });
  }

  subTotal(): number {
    return this.cartCalculator.calculateSubTotal(this.cart);
  }

  remove(product: Product): void {
    this.cart.remove(product);
  }

  onQuantityChange(selection: ProductSelection, quantity: number) {
    if (quantity > 0) {
      selection.quantity = quantity;
    }
    else {
      selection.quantity = 1;
    }
  }

  //แบ่งสิทธิ์สำหรับทุกระดับผู้ใช้
  isLogin() {
    if (this.apiService.isLoggedIn()) {
      return true
    } else {
      return false
    }
  }

  //แบ่งสิทธิ์สำหรับผู้ดูแลระบบ
  isAdmin() {
    if (this.apiService.getUserlevel() == '1') {
      return true
    } else {
      return false
    }
  }

  //แบ่งสิทธิ์สำหรับพนักงาน
  isStaff() {
    if (this.apiService.getUserlevel() == '2') {
      return true
    } else {
      return false
    }
  }

  //แบ่งสิทธิ์สำหรับลูกค้า
  isCustommer() {
    if (this.apiService.getUserlevel() == '3') {
      return true
    } else {
      return false
    }
  }

  isLogout() {
    if (this.apiService.isLoggedIn()) {
      return false
    } else {
      return true
    }
  }

  isPermission(permission: any) {
    if (permission == '1') {
      return true
    } else if (permission == '2') {
      return true
    } else if (permission == '3') {
      return true
    } else {
      return false
    }
  }

  logout(): void {
    this.apiService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
