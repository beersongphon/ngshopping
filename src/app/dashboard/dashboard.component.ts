import { Component, OnInit } from '@angular/core';
import { DashboardService } from './shared/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  countuser: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getCountUser()
  }

  getCountUser(): void {
    this.dashboardService.getCountUser({}).subscribe({
      next: (data) => {
        this.countuser = data;
      }, error: (error) => {
        this.countuser;
      }
    });
  }

}
