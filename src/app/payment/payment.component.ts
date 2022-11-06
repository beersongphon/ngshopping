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
  image: String = "http://localhost/api_shopping/upload/";
  slip_image: any;
  order_ids: any;
  pay_totals: any;

  file = new FormControl('')
  file_data: any = ''

  pageNo: object = {};
  order: any[] = [];
  payment: any

  isDisableOrderID = true;


  constructor(private currencyPipe: CurrencyPipe, private http: HttpClient, private apiService: ApiService, public cart: CartService, private cartCalculator: CartCalculator, private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getUser();
    this.getOrderUser();
  }

  getUser(): void {
    this.apiService.getUser().subscribe(
      (data) => {
        this.user = data;
        // this.user_id = data.user_id;
        // this.user_firstname = data.user_firstname;
        // this.user_lastname = data.user_lastname;
        // this.user_address = data.user_address;
        // this.user_email = data.user_email;
        // this.user_tel = data.user_tel;
      }
    );
  }


  fileChange(event: any) {
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {

      const file = fileList[0];
      console.log(this.slip_image);

      //get file information such as name, size and type
      console.log('finfo', file.name, file.size, file.type);
      //max file size is 4 mb
      if ((file.size / 1048576) <= 4) {
        let formData = new FormData();
        let info = { id: 2, name: 'raja' }
        formData.append('file', file, file.name);
        formData.append('id', '2');
        formData.append('tz', new Date().toISOString())
        formData.append('update', '2')
        formData.append('info', JSON.stringify(info))
        this.file_data = formData

      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }

    }


    // if (event.target.files && event.target.files[0]) {
    //   var filesAmount = event.target.files.length;
    //   console.log(event.target.files);
    //   console.log(filesAmount);
    //   for (let i = 0; i < filesAmount; i++) {
    //     var reader = new FileReader();
    //     reader.onload = (event: any) => {
    //       // Push Base64 string
    //       // this.images.push(event.target.result);
    //       // this.patchValues();
    //     }
    //     reader.readAsDataURL(event.target.files[i]);
    //   }
    // }

  }


  // filedata:any;
  //   /* File onchange event */
  //   fileEvent(e:any){
  //       this.filedata = e.target.files[0];
  //   }
  //   /* Upload button functioanlity */
  //   onSubmitform(f: NgForm) {

  //     var myFormData = new FormData();
  //     const headers = new HttpHeaders();
  //     headers.append('Content-Type', 'multipart/form-data');
  //     headers.append('Accept', 'application/json');
  //     myFormData.append('image', this.filedata);
  //     console.log(myFormData);
  //     console.log(this.slip_image);
  //     /* Image Post Request */
  //     this.http.post('http://localhost/api_shopping/save.php', myFormData, {
  //     headers: headers
  //     }).subscribe(data => {
  //      //Check success message
  //      console.log(data);
  //     });

  // }

  imageSrc: any = '';
  status: boolean = false

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

    // this.status = event.target.files.length>0?true:false
    // console.log(this.status);
    // if(this.status==true){
    //    const reader = new FileReader();
    //    console.log(reader);
    //    reader.readAsDataURL(file);
    //    console.log(reader);
    //    reader.onload = () => {
    //       this.imageSrc = reader.result;
    //       console.log(this.imageSrc);
    //    }
    // }
  }
  submit() {
    this.http.post('http://localhost/api_shopping/imageupload.php', { 'image': this.imageSrc })
      .subscribe(response => {
        console.log('Uploaded Successfully.', response);

      })
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
  sub() {
    // let body = { user_id: localStorage.getItem('token'), order_id: this.order_ids };
    // // let bodys = Object.assign(body, { order_id: this.order_ids });
    // this.cart.getOrderUser(body).subscribe(
    //   (payments) => {
    //     if (payments.status == "success") {
    //       this.payments = payments;
    //       this.isDisableOrderID = false;
    //     } else {
    //       this.isDisableOrderID = true;
    //     }
    //   }
    // );
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

  // ngOnDestroy(): void {
  //   this.sub?.unsubscribe();
  // }



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

  // เปลี่ยนรับค่าราคารวมที่ชำระ
  totalChange(): void {
    $("#pay_total").empty();
    var order_id = $("#order_id").val();
    $.ajax({
      url: "query/get_payment.php",
      data: {
        "order_id": order_id
      },
      method: "post",
      dataType: "json",
      success: function (result) {
        result.forEach((data: any) => {
          $("#pay_total").append(`<option value="${data.order_total}">${parseFloat(data.order_total)}</option>`);
        });
      }
    });
  }
}
