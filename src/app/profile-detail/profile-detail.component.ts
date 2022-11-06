import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { encode, decode } from 'js-base64';
import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  user: any;
  user_id: any;
  user_firstname: any;
  user_lastname: any;
  user_address: any;
  user_email: any;
  user_tel: any;
  permission_id: any;
  user_password: string = "";
  user_old_password: string = "";
  user_new_password: string = "";
  user_confirm_password: string = "";

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.apiService.getUser().subscribe(
      (data) => {
        this.user = data;
        this.user_id = data.user_id;
        this.user_firstname = data.user_firstname;
        this.user_lastname = data.user_lastname;
        this.user_address = data.user_address;
        this.user_email = data.user_email;
        this.user_tel = data.user_tel;
        this.user_password = data.user_password;
        this.permission_id = data.permission_id;
      }
    );
  }

  updateUser(): void {
    let body = {
      user_id: this.user_id,
      permission_id: this.permission_id
    }
    // if (this.validateSubmit()) return;
    if (this.user_old_password == '') {
      let bodyUpdate = Object.assign(body, { user_firstname: this.user_firstname, user_lastname: this.user_lastname, user_email: this.user_email, action_type: "A" });
      this.apiService.updateUser(bodyUpdate).subscribe(
        (messages) => {
          if (messages.status == "success") {
            Swal.fire({
              icon: 'success',
              title: (messages.message),
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              if (result.isDismissed) {
                // this.router.navigateByUrl('/cart');
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
    } else if (this.user_old_password) {
      let bodyUpdate = Object.assign(body, { user_firstname: this.user_firstname, user_lastname: this.user_lastname, user_email: this.user_email, user_password: this.user_new_password, old_password: this.user_old_password, confirm_password: this.user_confirm_password, action_type: "B" });
      if (this.validateSubmitPassword()) return;
      this.apiService.updateUser(bodyUpdate).subscribe(
        (messages) => {
          if (messages.status == "success") {
            Swal.fire({
              icon: 'success',
              title: (messages.message),
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              if (result.isDismissed) {
                // this.router.navigateByUrl('/cart');
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
    }
  }

  validateSubmit(): boolean {
    if (this.user_firstname == '' || this.user_lastname == '') {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกชื่อ - นามสกุล',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          setTimeout(() => {
            // this.scrollDown();
          }, 300);
        }
      });
      return true;
    } else if (this.user_email == '') {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกอีเมล',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          setTimeout(() => {
            // this.scrollDown();
          }, 300);
        }
      });
      return true;
    }
    return false;
  }

  validateSubmitPassword(): boolean {
    if (this.user_new_password == "") {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกรหัสใหม่',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          setTimeout(() => {
            // this.scrollDown();
          }, 300);
        }
      });
      return true;
    } else if (this.user_new_password != this.user_confirm_password) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาตรวจสอบรหัสผ่านของคุณอีกครั้ง',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          setTimeout(() => {
            // this.scrollDown();
          }, 300);
        }
      });
      return true;
    }
    return false;
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

  //แบ่งสิทธิ์สำหรับลูกค้า
  isCustommer() {
    if (this.apiService.getUserlevel() == '3') {
      return true
    } else {
      return false
    }
  }
}
