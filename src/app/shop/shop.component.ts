import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  shop: any = [];
  category: any = [];
  page: number = 1;
  confirm: String = "";
  tableClass: String = "";
  txtTitle: String = "";
  txtSearchs: any = [];

  config = {
    id: 'custom',
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: this.shop.length
  };

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  selectedItemsList: any = [];
  checkedIDs: any = [];

  constructor(private title: Title, private apiService: ApiService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getShops();
    this.getCategory();
  }

  onPageChange(event: any) {
    this.config.currentPage = event;
  }

  getShops(): void {
    let body: any = [];
    this.productService.getShop(body).subscribe(
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
        this.shop = this.shop.map((item: any) => ({
          ...item,
          img_product: environment.imageUrl + item.img_product
        }));
        for (let i = 0; i < this.shop.length; i++) {
          let element = this.shop[i].images;
          element = element.map((item: any) => ({
            ...item,
            img_product: environment.imageUrl + item.img_product,
          }));
          this.shop[i] = Object.assign(this.shop[i], { images: element });
        }
      }
    );
  }

  getCategory(): void {
    let body = {
      txtSearch: ''
    }
    this.productService.getCategory(body).subscribe(
      (data) => {
        this.category = data;
      }
    );
  }

  getShop(): void {
    this.checkedIDs = []
    this.category.forEach((value: any, index: any) => {
      if (value.isChecked) {
        this.checkedIDs.push({
          txtSearch: value.category_id
        });
      }
    });

    this.productService.getShop(this.checkedIDs).subscribe({
      next: (data) => {
        this.shop = data;
        this.shop = this.shop.map((item: any) => ({
          ...item,
          img_product: environment.imageUrl + item.img_product
        }));
        for (let i = 0; i < this.shop.length; i++) {
          let element = this.shop[i].images;
          element = element.map((item: any) => ({
            ...item,
            img_product: environment.imageUrl + item.img_product,
          }));
          this.shop[i] = Object.assign(this.shop[i], { images: element });
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

  changeSelection(): void {
    this.fetchSelectedItems()
  }

  fetchSelectedItems(): void {
    this.selectedItemsList = this.category.filter((value: any, index: any) => {
      return value.isChecked
    });
  }

  fetchCheckedIDs(): void {
    this.checkedIDs = []
    this.category.forEach((value: any, index: any) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.category_id);
      }
    });
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
