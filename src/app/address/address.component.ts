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
    this.apiService.getUser().subscribe(
      (data) => {
        if (data.user_firstname) {
          this.name = data.user_firstname + " " + data.user_lastname;
          this.address = data.user_address;
        }
      },(error) => {
        this.name = "";
      }
    );
  }
}
