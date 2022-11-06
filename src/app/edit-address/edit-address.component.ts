import { Component, OnInit } from '@angular/core';
import { ApiService } from './../shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  user: any;
  user_id: any
  permission_id: any

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.apiService.getUser().subscribe(
      (data) => {
        if (data.user_firstname) {
          this.user = data;
          this.user_id = data.user_id;
          this.permission_id = data.permission_id;
        }
      }, (error) => {
        this.user = "";
      }
    );
  }

  updateUser(formValue: any): void {
    let body = {
      user_id: this.user_id,
      user_address: formValue.user_address,
      permission_id: this.permission_id,
      action_type: "A",
    }
    this.apiService.updateUser(body).subscribe(
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
