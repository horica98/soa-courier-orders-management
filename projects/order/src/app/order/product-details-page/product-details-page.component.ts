import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { InjectionTokens, OrderService, Product, ProductService } from '@nike-core';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cha: ChangeDetectorRef,
    @Inject(InjectionTokens.ProductService) private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.cha.detectChanges();
    console.log('intra');
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id)
        .pipe(take(1))
        .subscribe(product => this.product = product);
    } else {
      this.router.navigate(['products']);
    }
  }

  addToCart($event: any): void {
    console.log('addToCartd', $event);
  }

  sizeSelected(size: number): void {
    console.log('sizeSelected', size);
  }
}
