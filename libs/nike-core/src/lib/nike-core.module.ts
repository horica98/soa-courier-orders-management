import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { InjectionTokens, PricePipe, SafePipe } from './utils';
import { MockOrderService, OrderServiceImpl, ProductServiceImpl } from './services';
import { MockProductService } from './services/mock-product.service';



@NgModule({
  declarations: [
    PricePipe,
    SafePipe
  ],
  providers: [
    { provide: InjectionTokens.OrderService, useClass: OrderServiceImpl },
    { provide: InjectionTokens.ProductService, useClass: ProductServiceImpl }
  ],
  imports: [
    CommonModule, HttpClientModule,
  ],
  exports: [
    PricePipe,
    SafePipe
  ]
})
export class NikeCoreModule { }
