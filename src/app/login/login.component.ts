import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.minLength(8), Validators.required]],
  });
  subLogin: Subscription | undefined;
  isLogin: boolean = false;
  profile: any;

  loginbtn: boolean | undefined;
  logoutbtn: boolean | undefined;

  //ใน constructor กำหนดให้ apiService เป็นตัวแปรแบบ private และ เรียกใช้งาน ApiService
  constructor(private title: Title,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router) {

  }

  ngOnInit() {
    //แสดงชื่อแท็บของเว็บไซค์
    this.title.setTitle('เข้าสู่ระบบ');
  }

  //เข้าสู่ระบบ
  login(): void {
    this.subLogin = this.apiService.login(this.loginForm.value).subscribe({
      next: (token) => {
        if (token.data) {
          Swal.fire({
            icon: 'success',
            title: (token.message),
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            if (result.isDismissed) {
              if (token.data.permission_id == "1") {
                const redirect = this.apiService.redirectUrl ? this.apiService.redirectUrl : '/dashboard';
                this.router.navigate([redirect]).then(() => {
                  window.location.reload();
                });
                // this.router.navigate([redirect]);
              } else if (token.data.permission_id == "2") {
                const redirect = this.apiService.redirectUrl ? this.apiService.redirectUrl : '/student';
                this.router.navigate([redirect]).then(() => {
                  window.location.reload();
                });
                // this.router.navigate([redirect]);
              } else if (token.data.permission_id == "3") {
                const redirect = this.apiService.redirectUrl ? this.apiService.redirectUrl : '/';
                this.router.navigate([redirect]).then(() => {
                  window.location.reload();
                });
                // this.router.navigate([redirect]);
              }
              localStorage.setItem('token', (token.data.user_id));
              localStorage.setItem('userlevel_id', (token.data.permission_id));
              this.isLogin = true;
              // const redirect = this.apiService.redirectUrl ? this.apiService.redirectUrl : '/';
              // this.router.navigate([redirect]);
              // this.profile = token.data;
              // this.profile.image = '../../assets/image/user.png';
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: (token.message),
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
}

