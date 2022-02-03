

import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '../shared/shared.module';
import { InjectionTokens } from '../shared';
import { MockOrderService } from './mock-order.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderServiceImpl } from './order.service';


@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailsComponent
  ],
  imports: [
    OrderRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [
    { provide: InjectionTokens.OrderService, useClass: OrderServiceImpl }
  ]
})
export class OrderModule { }
