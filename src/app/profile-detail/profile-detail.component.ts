import { Component, OnInit } from '@angular/core';
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
      }
    );
  }
}
