import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { CartService } from './../shared/cart.service';
import { ProductService } from './../shared/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  order: any[] = [];
  pageNo: object = {};
  sub: Subscription | undefined;
  sentToPrint: Subject<object> = new Subject<object>();
  diffDays: any;
  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.order.length
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

  constructor(private apiService: ApiService, private cartService: CartService, private productService: ProductService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    let body = {};
    this.sub = this.cartService.getOrderUser(body).subscribe({
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
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const firstDate: any = new Date(item[i].order_date);
      const secondDate: any = new Date()
      this.diffDays = Math.round(Math.abs((firstDate - secondDate)) / oneDay);
      if (this.diffDays > 3) {

      } else {

      }
      item[i] = Object.assign(item[i], this.pageNo, { "diffDays": this.diffDays });
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

  clickDelete(id: any) {
    let body = {
      order_id: id,
    }
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณจะไม่สามารถเปลี่ยนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.value) {
        this.productService.deleteOrderDetail(body).subscribe({
          next: (data) => {
            if (data.status == "success") {
              this.productService.deleteOrder(body).subscribe({
                next: (data) => {
                  if (data.status == "success") {
                    Swal.fire({
                      icon: "success",
                      title: (data.message),
                      showConfirmButton: false,
                      timer: 2000
                    }).then((result) => {
                      if (result.isDismissed) {
                        this.router.navigate(['/orders']);
                        this.getOrder();
                      }
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: (data.message),
                      showConfirmButton: false,
                      timer: 2000
                    }).then((result) => {
                      if (result.isDismissed) {
                        window.history.back;
                      }
                    });
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
            } else {
              Swal.fire({
                icon: "error",
                title: (data.message),
                showConfirmButton: false,
                timer: 2000
              }).then((result) => {
                if (result.isDismissed) {
                  window.history.back;
                }
              });
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
    })
  }

  isLogin() {
    if (this.apiService.isLoggedIn()) {
      return true
    } else {
      return false
    }
  }

  isAdmin() {
    if (this.apiService.getUserlevel() == '1') {
      return true
    } else {
      return false
    }
  }

  isStaff() {
    if (this.apiService.getUserlevel() == '2') {
      return true
    } else {
      return false
    }
  }

  isCustomer() {
    if (this.apiService.getUserlevel() == '3') {
      return true
    } else {
      return false
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
