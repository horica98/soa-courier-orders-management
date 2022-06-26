import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { BootsSizes, Product } from '@nike-core';

@Component({
  selector: 'nike-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {
  @Input() product: Product;
  @Input() selectedSize?: number;
  @Output() sizeSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() addToCart: EventEmitter<any> = new EventEmitter<any>();
  sizes = BootsSizes;

  onSelectionChange(size: number): void {
    this.sizeSelected.emit(size);
  }
}
