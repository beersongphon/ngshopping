import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { ApiService } from './../shared/api.service';
import { CartService } from './../shared/cart.service';
import { CartCalculator } from './../shared/cart-calculator';
import { Product } from '../shared/product.model';
import { ProductSelection } from './../shared/product-selection';
import Swal from 'sweetalert2';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgxMatDateAdapter, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgxMatMomentAdapter, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import * as $ from 'jquery';

// import { DatePipe } from '@angular/common';
// import { FormControl } from '@angular/forms';
// import { MAT_DATE_LOCALE } from '@angular/material/core';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { AfterSaleService } from 'src/service/after-sale.service';
// import { fn_get_Alert_Confirm, fn_get_Alert_ConfirmDelMio, fn_get_Alert_Error, fn_get_Alert_Success, fn_get_Alert_SuccessDel } from 'src/swal-alert/swal';
// import Swal from 'sweetalert2';
// import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver'

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY HH:mm',
  },
  display: {
    dateInput: 'DD/MM/YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: NGX_MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class PaymentComponent implements OnInit {

  user: any;
  user_id: any;
  user_firstname: any;
  user_lastname: any;
  user_address: any;
  user_email: any;
  user_tel: any;

  slip_image: any;
  order_ids: any;
  pay_totals: any;

  file = new FormControl('')
  file_data: any = ''

  pageNo: object = {};
  order: any[] = [];
  payment: any

  isDisableOrderID = true;

  imageSrc: any = '';
  status: boolean = false


  constructor(private currencyPipe: CurrencyPipe, private http: HttpClient, private apiService: ApiService, public cart: CartService, private cartCalculator: CartCalculator, private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getUser();
    this.getOrderUser();
  }

  getUser(): void {
    this.apiService.getUser().subscribe({
      next: (data) => {
        this.user = data;
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

  onFileChange(event: any) {
    this.status = false
    // const file = event.target.files[0];
    const file = event.target.files[0].name.toLowerCase().match(/(.jpg|.png)/);
    console.log(file);
    if (file) {
      const fileReader = new FileReader();
      console.log(fileReader);
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (ev: any) => {
        const data = ev.target.result;
        console.log(data);
        // this.imageSrc = fileReader.result;
        this.imageSrc = data;
        console.log(this.imageSrc);
      };
      // fileReader.readAsArrayBuffer(event.target.files[0]);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Upload file ได้เฉพาะ .jpg หรือ .png เท่านั้น',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.isDismissed) {
          window.history.back;
        }
      });
    }
  }

  insertPayment(order: any): void {
    let body = {
      order_id: this.order_ids,
      pay_total: this.pay_totals,
      pay_tel: order.user_tel,
      image: this.imageSrc
    }
    this.cart.insertPayment(body).subscribe(
      (messages) => {
        if (messages.status == "success") {
          let bodys = {
            order_name: order.user_firstname + ' ' + order.user_lastname,
            order_address: order.user_address,
            order_id: this.order_ids,
          };
          this.cart.updatePayment(bodys).subscribe(
            (messages) => {
              if (messages.status == "success") {
                Swal.fire({
                  icon: 'success',
                  title: (messages.message),
                  showConfirmButton: false,
                  timer: 1500
                }).then((result) => {
                  if (result.isDismissed) {
                    this.router.navigateByUrl('/cart');
                  }
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: (messages.message),
                  showConfirmButton: false,
                  timer: 1500
                }).then((result) => {
                  if (result.isDismissed) {
                    window.history.back;
                  }
                });
              }
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: (messages.message),
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            if (result.isDismissed) {
              window.history.back;
            }
          });
        }
      }
    );
  }

  getOrderUser(): void {
    let body = { user_id: localStorage.getItem('token') };
    this.cart.getOrderUser(body).subscribe(
      (orders) => {
        if (orders.status == "success") {
          // this.product = products;
          this.order = this.addPageNo(orders.data);
          this.isDisableOrderID = false;
          // let bodys = Object.assign(body, { order_id: this.order_ids });
          // this.cart.getOrderUser(bodys).subscribe(
          //   (payments) => {
          //     if (payments.status == "success") {
          //       this.payment = payments;
          //       this.isDisableOrderID = false;
          //     } else {
          //       this.isDisableOrderID = true;
          //     }
          //   }
          // );
        } else {
          this.isDisableOrderID = true;
        }
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

  changeOrderID() { //Angular 11
    var order_id = $("#order_id").val();
    let body = {
      "order_id": order_id
    }
    this.cart.getPayment(body).subscribe(
      (payments) => {

        // this.product = products;
        this.payment = payments;
        this.isDisableOrderID = false;
        console.log(payments);
        // for (let i = 0; i < this.payment.length; i++) {
        //   $("#pay_total").append(`'<option value="${this.payment[i].order_total}">${parseFloat(this.payment[i].order_total)}</option>'`);
        // }
        // $("#pay_total").append(`'<option value="${payments[0].order_total}">${parseFloat(payments[0].order_total)}</option>'`);
        // let bodys = Object.assign(body, { order_id: this.order_ids });
        // this.cart.getOrderUser(bodys).subscribe(
        //   (payments) => {
        //     if (payments.status == "success") {
        //       this.payment = payments;
        //       this.isDisableOrderID = false;
        //     } else {
        //       this.isDisableOrderID = true;
        //     }
        //   }
        // );

      }
    );
    // $.ajax({
    //   url: "http://localhost/api_shopping/get_payment.php",
    //   data: {
    //     "order_id": order_id
    //   },
    //   method: "post",
    //   dataType: "json",
    //   success: function (result) {
    //     result.forEach((data: any) => {
    //       console.log(parseFloat(data.order_total.toLocaleString()));
    //       $("#pay_total").append(`'<option value="${data.order_total}">${parseFloat(data.order_total.toLocaleString())}</option>'`);
    //     });
    //   }
    //   // formatCurrency(10,this.locale, 'INR');
    // });

    // $("#order_id").on("change", function () {
    //   this.totalChange();
    // });
  }


}
