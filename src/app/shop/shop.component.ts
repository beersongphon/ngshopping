import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shop: any = [];
  page: number = 1;
  image: String = "http://localhost/api_shopping/upload/";
  confirm: String = "";
  tableClass: String = "";
  txtTitle: String = "";

  constructor(private title: Title, private apiService: ApiService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getShop();
  }

  getShop(): void {
    this.productService.getShop().subscribe(
      (data) => {
        this.shop = data;
        if (data[0].product_quantity == 0) {
          // สินค้าหมด
          this.confirm = "return false;";
          this.tableClass = "label stockout";
          this.txtTitle = "สินค้าหมด";
          // console.log(data);
          // $txtTitle = "Out Of Stock";
        } else {
          // เหลือ > 1 ชิ้น
          this.confirm = "return true;";
          this.tableClass = "label stockblue";
          this.txtTitle = "Sale";
          // console.log(data);
          // $txtTitle = "New";
        }
        // console.log(data);
      }
    );
  }

  //แบ่งสิทธิ์สำหรับทุกระดับผู้ใช้
  isLogin() {
    return this.apiService.isLoggedIn();
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

}
