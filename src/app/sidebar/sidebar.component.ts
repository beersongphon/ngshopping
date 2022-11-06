import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.apiService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  isLogin() {
    return this.apiService.isLoggedIn();
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
