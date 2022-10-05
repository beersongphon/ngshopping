import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './../shared/api.service';
import { CartService } from './../shared/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  order: any[] = [];
  sub: Subscription | undefined;

  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    this.sub = this.cartService.getOrder().subscribe(
      (orders) => {
        this.order = orders;
      }
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
