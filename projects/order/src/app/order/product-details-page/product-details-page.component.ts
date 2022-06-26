import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { InjectionTokens, OrderService, PackageProduct, Product, ProductService } from '@nike-core';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  product: Product;
  selectedSize?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cha: ChangeDetectorRef,
    @Inject(InjectionTokens.ProductService) private productService: ProductService,
    @Inject(InjectionTokens.OrderService) private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.cha.detectChanges();
    console.log('param', this.route.snapshot.paramMap)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id)
        .pipe(take(1))
        .subscribe(res => this.product = res.product);
    } else {
      this.router.navigate(['products']);
    }
  }

  addToCart(): void {
    const userId = JSON.parse(localStorage.getItem('user') || '')?.id;
    const product: PackageProduct = {...this.product, size: this.selectedSize || 0};
    this.orderService.addToCart(product, userId).pipe(take(1)).subscribe(res => {
      this.router.navigate(['orders/cart']);
    })
  }

  sizeSelected(size: number): void {
    this.selectedSize = size === this.selectedSize ? undefined : size;
  }
}
