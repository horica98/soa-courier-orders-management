import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { InjectionTokens, Order, OrderService } from '@nike-core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {
  orders: any[] | undefined;
  courier: any = null;
  constructor(
    private router: Router,
    private cha: ChangeDetectorRef,
  @Inject(InjectionTokens.OrderService) private orderService: OrderService
  ) { }

  ngOnInit(): void {
    console.log('intra')
    this.cha.detectChanges();
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/']);
      return;
    }
    this.orderService.getOrdersByUser(JSON.parse(user).id).pipe(take(1)).subscribe(res => {
      this.orders = res.orders;
      this.cha.detectChanges();
    });
    // this.courier = JSON.parse(<string>user);
    // this.orders$ = this.orderService.getAll().pipe(map(res => res.orders));
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
