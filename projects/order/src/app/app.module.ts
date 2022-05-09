import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderModule } from './order/order.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrderModule
  ],
  providers: [
    AndroidPermissions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
