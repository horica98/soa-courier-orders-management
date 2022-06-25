import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { Cart, InjectionTokens, MessageType, OrderService, ProductService } from '@nike-core';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../../../../libs/nike-core/src/lib/services/snackbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart;
  userId: number;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    @Inject(InjectionTokens.ProductService) private productService: ProductService,
    @Inject(InjectionTokens.OrderService) private orderService: OrderService,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    console.log('intra');
    const user = localStorage.getItem('user');
    if (!!user) {
      this.userId = JSON.parse(user)?.id;
      this.orderService.getCart(this.userId)
        .pipe(take(1))
        .subscribe(res => {
          this.cart = res.cart;
          console.log(this.cart)
          this.changeDetectorRef.detectChanges();
        });
    } else {
      this.router.navigate(['']);
    }
  }

  makeOrder(order: any) {
    console.log('makeOrder');
    this.orderService.checkout(this.userId).pipe(take(1)).subscribe(() => {
      this.snackbarService.open('Order successfully created', MessageType.SUCCESS);
      this.router.navigate(['/orders/products'])
    });
  }
}
