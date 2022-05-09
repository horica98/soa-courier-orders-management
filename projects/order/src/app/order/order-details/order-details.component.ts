import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { InjectionTokens, Order, OrderService } from '@nike-core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: Order | undefined;
  courierId: number | undefined;
  constructor(
    @Inject(InjectionTokens.OrderService) private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private cha: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cha.detectChanges();
    const user = localStorage.getItem('user');
    if(!user) {
      this.router.navigate(['orders']);
      return;
    }
    this.courierId = JSON.parse(user).id;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getOrderById(+id)
        .pipe(take(1))
        .subscribe(res => this.order = res.order);
    } else {
      this.router.navigate(['orders']);
    }
  }

  takeOrder(order: Order) {
    if (this.courierId) {
      this.orderService.takeOrder(order.id, this.courierId).pipe(take(1)).subscribe();
    }
  }
}
