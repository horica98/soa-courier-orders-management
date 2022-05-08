import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { InjectionTokens, Product, ProductService } from '@nike-core';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
// TODO: EXTRACT PRODUCTS PAGE INTO DIFFERENT APP
  constructor(
    @Inject(InjectionTokens.ProductService) private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(take(1))
      .subscribe(products => this.products = products);
  }

  goToProductDetails(): void {
    this.router.navigate([`/orders/products/1`]);
  }
}
