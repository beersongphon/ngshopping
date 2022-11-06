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
  category: any = [];
  page: number = 1;
  image: String = "http://localhost/api_shopping/upload/";
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
    console.log(event);
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

    this.productService.getShop(this.checkedIDs).subscribe(
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
