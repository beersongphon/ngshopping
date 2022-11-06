import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from './../shared/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  insertUser(formValue: any): void {
    console.log(formValue);
    if(this.validateSubmit(formValue)) return
    console.log(formValue);
    this.apiService.insertUser(formValue).subscribe({
      next: (data) => {
        if (data.status == "success") {
          Swal.fire({
            icon: "success",
            title: (data.message),
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            if (result.isDismissed) {
              this.router.navigate(['/login']);
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

  validateSubmit(formValue: any): boolean {
    if (formValue.user_password == "") {
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
    } else if (formValue.user_password != formValue.user_confirm_password) {
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
}
