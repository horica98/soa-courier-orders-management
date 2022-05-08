import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';

import { InjectionTokens, MockOrderService, NikeCoreModule, OrderServiceImpl } from '@nike-core'
import { NikeSharedModule } from '@nike-shared';

import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailsComponent,
    ProductsPageComponent,
    ProductDetailsPageComponent,
    CartComponent
  ],
  imports: [
    OrderRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NikeCoreModule,
    NikeSharedModule
  ],
  providers: [
    // { provide: InjectionTokens.OrderService, useClass: MockOrderService }
  ]
})
export class OrderModule { }
