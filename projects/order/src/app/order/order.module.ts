import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';

import { InjectionTokens, MockOrderService, OrderServiceImpl } from '@nike-core'

import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailsComponent
  ],
  imports: [
    OrderRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [
    { provide: InjectionTokens.OrderService, useClass: MockOrderService }
  ]
})
export class OrderModule { }
