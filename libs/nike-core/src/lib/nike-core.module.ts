import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { InjectionTokens, PricePipe } from './utils';
import { MockOrderService } from './services';
import { MockProductService } from './services/mock-product.service';



@NgModule({
  declarations: [
    PricePipe
  ],
  providers: [
    { provide: InjectionTokens.OrderService, useClass: MockOrderService },
    { provide: InjectionTokens.ProductService, useClass: MockProductService }
  ],
  imports: [
    CommonModule, HttpClientModule,
  ],
  exports: [
    PricePipe
  ]
})
export class NikeCoreModule { }
