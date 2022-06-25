import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { InjectionTokens, MockOrderService, NikeCoreModule, OrderServiceImpl } from '@nike-core'
import { NikeSharedModule } from '@nike-shared';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { CartComponent } from './cart/cart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SnackbarService } from '../../../../../libs/nike-core/src/lib/services/snackbar.service';


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
    NikeSharedModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [
    // { provide: InjectionTokens.OrderService, useClass: OrderServiceImpl },
    AndroidPermissions,
    SnackbarService
  ]
})
export class OrderModule { }
