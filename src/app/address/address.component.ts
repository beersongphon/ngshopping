import { Component, OnInit } from '@angular/core';
import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  name: any;
  address: any;;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.apiService.getUser().subscribe({
      next: (data) => {
        if (data.user_firstname) {
          this.name = data.user_firstname + " " + data.user_lastname;
          this.address = data.user_address;
        }
      }, error: (error) => {
        this.name = "";
      }
    });
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

  isCustommer() {
    if (this.apiService.getUserlevel() == '3') {
      return true
    } else {
      return false
    }
  }
}
