import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { InjectionTokens } from './utils';
import { MockOrderService } from './services';



@NgModule({
  declarations: [
  ],
  providers: [
    { provide: InjectionTokens.OrderService, useClass: MockOrderService }
  ],
  imports: [
    CommonModule, HttpClientModule,
  ],
  exports: [
  ]
})
export class NikeCoreModule { }
