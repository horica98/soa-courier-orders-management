import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { Cart, InjectionTokens, OrderService, ProductService } from '@nike-core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Cart;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(InjectionTokens.ProductService) private productService: ProductService,
    @Inject(InjectionTokens.OrderService) private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.productService.getCart().pipe(take(1)).subscribe(cart => this.cart = cart);
  }

  makeOrder(order: any) {
    console.log('makeOrder');
    // this.orderService.makeOrder()
  }
}
