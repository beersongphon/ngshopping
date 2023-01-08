import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';

@Component({
  selector: 'app-report-sale',
  templateUrl: './report-sale.component.html',
  styleUrls: ['./report-sale.component.css']
})
export class ReportSaleComponent implements OnInit, OnDestroy {

  sentToPrint: Subject<object> = new Subject<object>();

  product: any;
  products: any[] = [];
  image: any[] = [];
  pageNo: object = {};
  sub: Subscription | undefined;

  search: string = "";

  order_date_from: any
  order_date_to: any

  currentPage: number = 1;

  constructor(private apiService: ApiService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getReportSale({});
  }

  getReportSale(actionType: any): void {
    let body = {}
    if (actionType == "search") {
      body = {
        order_date_from: this.order_date_from,
        order_date_to: this.order_date_to
      };
    } else {
      this.order_date_from = '';
      this.order_date_to = '';
      this.product = [];
    }
    this.sub = this.productService.getReportSale(body).subscribe({
      next: (data) => {
        if (data.status == "success") {
          this.product = this.addPageNo(data['data']);
          this.products = Object.assign({ total: data['total'], data: this.addPageNo(data['data']) });
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

  addPageNo(item: any) {
    for (let i = 0; i < item.length; i++) {
      this.pageNo = {
        "pageNo": i + 1
      };
      item[i] = Object.assign(item[i], this.pageNo);
    }
    return item;
  }


  clickPrint() {
    let listToPrint: any;
    let num = 0
    listToPrint = JSON.parse(JSON.stringify(this.products));
    // console.log(listToPrint);

    // for (let i = 0; i < this.order.length; i++) {
    //   listToPrint[nums] = JSON.parse(JSON.stringify(this.order[i]));
    //   console.log(listToPrint[nums]);
    //   nums++
    //   console.log(listToPrint);

    //   if (this.order[i] == true) {
    //     console.log(listToPrint);
    //   }
    // }
    if (listToPrint.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาระบุรายการที่ต้องการพิมพ์',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.isDismissed) {
          window.history.back;
        }
      });
    } else {
      // for (let i = 0; i < listToPrint.length; i++) {
      //   // listToPrint[i].custName = listToPrint[i].custName.split(' ')[0] + " xxxxx";
      //   // listToPrint[i].contactPhone1 = markDataPrivacy(listToPrint[i].contactPhone1,'tel')
      //   listToPrint[i]
      // }
      this.sentToPrint.next(listToPrint);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
