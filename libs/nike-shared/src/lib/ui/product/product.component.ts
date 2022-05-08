import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '@nike-core';

@Component({
  selector: 'nike-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: Product;
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
}
