import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isActive: boolean = true;
  product: any[] = [];
  image: String = "http://localhost/api_shopping/upload/";

  //Slider settings
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };

  constructor(private title: Title, private apiService: ApiService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    this.productService.getShop().subscribe(
      (data) => {
        this.product = data;
        // data.sort((a: any,b: any) => a.product_id.localeCompare(b.product_id));
        console.log(data);
        // for (let i = 0; i < data.length; i++) {
        //   let body = []
        //   for(let img of data[i].images) {
        //     console.log(img);
        //     body.push(img)
        //     console.log(body);

        //   }
        // }
      }
    );
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
