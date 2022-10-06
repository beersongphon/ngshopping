import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../shared/api.service';
import { CartService } from './../shared/cart.service';
import { CartCalculator } from './../shared/cart-calculator';
import { Product } from '../shared/product.model';
import { ProductSelection } from './../shared/product-selection';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { NgxMatDateAdapter, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgxMatMomentAdapter, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';

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
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: NGX_MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class CheckoutComponent implements OnInit {

  user_id: any;
  user_firstname: any;
  user_lastname: any;
  user_address: any;
  user_email: any;
  user_tel: any;
  image: String = "http://localhost/api_shopping/upload/";

  constructor(private apiService: ApiService, public cart: CartService, private cartCalculator: CartCalculator, private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.apiService.getUser().subscribe(
      (data) => {
        this.user_id = data.user_id;
        this.user_firstname = data.user_firstname;
        this.user_lastname = data.user_lastname;
        this.user_address = data.user_address;
        this.user_email = data.user_email;
        this.user_tel = data.user_tel;
      }
    );
  }

  insertOrder(state: any): void {
    let bodyOrder = {
      user_id: this.user_id,
      order_name: this.user_firstname + " " + this.user_lastname,
      order_address: this.user_address,
      order_tel: this.user_tel,
      order_email: this.user_email,
      order_total: this.cartCalculator.calculateSubTotal(this.cart),
    }
    let order_id = { order_id: "OR_" + this.datePipe.transform(new Date(), "YYYYMMdd") + "_" + this.datePipe.transform(new Date(), "HHmmss") }
    let body = Object.assign(bodyOrder, order_id);

    this.cart.insertOrder(body).subscribe(
      (messages) => {
        // this.dataSource = users;
        if (messages.status == "success") {
          let bodyOrderDetail = []
          for (let i = 0; i < state.length; i++) {
            let bodyOrderDetails = Object.assign({
              product_id: state[i].product.product_id,
              order_price: state[i].quantity * state[i].product.product_price,
              order_quantity: state[i].quantity
            }, order_id);
            bodyOrderDetail.push(bodyOrderDetails)
          }
          this.cart.insertOrderDetail(bodyOrderDetail).subscribe(
            (messages) => {
              // this.dataSource = users;
              if (messages.status == "success") {
                let bodySum = []
                for (let i = 0; i < state.length; i++) {
                  bodySum.push({
                    product_id: state[i].product.product_id,
                    product_quantity: state[i].product.product_quantity - state[i].quantity
                  })
                }
                this.cart.updateCheckStock(bodySum).subscribe(
                  (messages) => {
                    if (messages.status == "success") {
                      Swal.fire({
                        icon: 'success',
                        title: (messages.message),
                        showConfirmButton: false,
                        timer: 1500
                      }).then((result) => {
                        if (result.isDismissed) {
                          this.cart.empty();
                          this.router.navigate(['/']);
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
        // alert(messages.message);
        // this.getStudents();
      }
    );
  }

  subTotal(): number {
    return this.cartCalculator.calculateSubTotal(this.cart);
  }

  remove(product: Product): void {
    this.cart.remove(product);
  }

  onQuantityChange(selection: ProductSelection, quantity: number) {
    if (quantity > 0) {
      selection.quantity = quantity;
    }
    else {
      selection.quantity = 1;
    }
  }
}
