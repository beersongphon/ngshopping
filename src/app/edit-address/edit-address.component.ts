import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  user: any;
  user_id: any
  permission_id: any

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.apiService.getUser().subscribe({
      next: (data) => {
        if (data.user_firstname) {
          this.user = data;
          this.user_id = data.user_id;
          this.permission_id = data.permission_id;
        }
      }, error: (error) => {
        this.user = "";
      }
    });
  }

  updateUser(formValue: any) {
    let body = {
      user_id: this.user_id,
      user_address: formValue.user_address,
      permission_id: this.permission_id,
      action_type: "A",
    };
    this.apiService.updateUser(body).subscribe({
      next: (data) => {
        if (data.status == "success") {
          Swal.fire({
            icon: "success",
            title: (data.message),
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            if (result.isDismissed) {
              this.router.navigateByUrl('/address');
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
}
