import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-product',
  templateUrl: './report-product.component.html',
  styleUrls: ['./report-product.component.css']
})
export class ReportProductComponent implements OnInit, OnDestroy {

  sentToPrint: Subject<object> = new Subject<object>();

  product: any[] = [];
  products: any;
  image: any[] = [];
  pageNo: object = {};
  sub: Subscription | undefined;

  search: string = "";

  currentPage: number = 1;

  constructor(private apiService: ApiService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getReportProduct();
  }

  getReportProduct(): void {
    this.sub = this.productService.getReportProduct({}).subscribe({
      next: (data) => {
        if (data.status == "success") {
          this.product = data['data'];
          this.product = this.addPageNo(this.product);
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
      }
      item[i] = Object.assign(item[i], this.pageNo);
    }
    return item;
  }

  clickPrint() {
    // this.SpinnerService.show()
    let listToPrint = []
    let num = 0
    // for (let i = 0; i < this.chbSelect.length; i++) {
    //   if (this.chbSelect[i] == true) {
    //     listToPrint[num] = JSON.parse(JSON.stringify(this.tableListPrintLabel[i]));
    //     num++
    //   }
    // }
    for (let i = 0; i < this.products.length; i++) {
      listToPrint[num] = JSON.parse(JSON.stringify(this.products[i]));
      num++

      if (this.products[i] == true) {

      }
    }
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
