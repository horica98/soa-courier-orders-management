import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderComponent } from './order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'products/:id', component: ProductDetailsPageComponent
  },
  {
    path: 'products', component: ProductsPageComponent
  },
  {
    path: '', component: OrderComponent
  },
  {
    path: ':id', component: OrderDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
