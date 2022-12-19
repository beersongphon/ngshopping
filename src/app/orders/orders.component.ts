import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { CartService } from './../shared/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  order: any[] = [];
  pageNo: object = {};
  sub: Subscription | undefined;
  sentToPrint: Subject<object> = new Subject<object>();

  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    let body = { user_id: localStorage.getItem('token') };
    this.sub = this.cartService.getOrder(body).subscribe({
      next: (data) => {
        // this.product = products;
        this.order = this.addPageNo(data);
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          title: (error.name),
          text: (error.message),
          // html:
          //   'You can use <b>bold text</b>, ' +
          //   '<a href="//sweetalert2.github.io">links</a> ' +
          //   'and other HTML tags',
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

  clickPrint(nums: any) {
    let listToPrints: any;
    listToPrints = JSON.parse(JSON.stringify(this.order[nums]));
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
      this.sentToPrint.next(listToPrints);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
