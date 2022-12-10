import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product: any[] = [];

  //Slider settings
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };

  constructor(private title: Title, private apiService: ApiService, public productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    let body: any = [];
    this.productService.getShop(body);
  }

  //แบ่งสิทธิ์สำหรับทุกระดับผู้ใช้
  // isLogin() {
  //   return this.apiService.isLoggedIn();
  // }

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
}
