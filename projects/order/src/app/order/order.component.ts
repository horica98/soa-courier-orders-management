import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { InjectionTokens, Order, OrderService } from '@nike-core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders$: Observable<Order[]> | undefined;
  courier: any = null;
  constructor(
    private router: Router,
    @Inject(InjectionTokens.OrderService) private orderService: OrderService
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/']);
      return;
    }
    this.courier = JSON.parse(<string>user);
    this.orders$ = this.orderService.getAll().pipe(map(res => res.orders));
  }

  takeOrder(order: Order): void {
    this.router.navigate([`orders/${order.id}`]);
  }

  returnCourier(order: Order): string {
    if (!order.courierId) {
      return 'Unassigned';
    }
    return this.courier?.id === order.courierId ? `Taken by ${this.courier?.name}` : `Taken by courier #${order.courierId}`;
  }
}
