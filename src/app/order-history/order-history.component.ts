import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { ProductService } from './../shared/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {

  order: any[] = [];
  image: any[] = [];
  pageNo: object = {};
  sub: Subscription = new Subscription;

  currentPage: number = 1;

  sentToPrint: Subject<object> = new Subject<object>();

  constructor(private apiService: ApiService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory(): void {
    let body = { user_id: localStorage.getItem('token') };
    this.sub = this.productService.getOrderHistory(body).subscribe(
      (orders) => {
        // this.product = products;
        this.order = this.addPageNo(orders);
      }
    );
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

  clickPrintLabel(nums: any) {
    // this.SpinnerService.show()
    let listToPrint: any[] = []
    let listToPrints: any
    let num = 0
    listToPrints = JSON.parse(JSON.stringify(this.order[nums]));
    // console.log(listToPrints);

    // for (let i = 0; i < this.order.length; i++) {
    //   listToPrint[nums] = JSON.parse(JSON.stringify(this.order[i]));
    //   console.log(listToPrint[nums]);
    //   nums++
    //   console.log(listToPrint);

    //   if (this.order[i] == true) {
    //     console.log(listToPrint);
    //   }
    // }
    if (listToPrints.length == 0) {
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
      // this.sentToPrint.next(listToPrint);
      this.sentToPrint.next(listToPrints);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }


    onClickDownloadPdf(){
      var sTable = document.getElementById('tab')?.innerHTML;

        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";

        // CREATE A WINDOW OBJECT.
        var win: any = window.open('', '', 'height=700,width=700');

        win.document.write('<html><head>');
        win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
        win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');

        win.document.close(); 	// CLOSE THE CURRENT WINDOW.

        win.print();    // PRINT THE CONTENTS.
    }
}
