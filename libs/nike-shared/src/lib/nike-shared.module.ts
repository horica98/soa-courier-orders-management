import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NikeCoreModule } from '@nike-core';
import { ProductComponent } from './ui/product/product.component';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from './ui/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { ProductDetailsComponent } from './ui/product-details/product-details.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


function createTranslateLoader(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NikeCoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'ro',
    }),
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
  ],
  declarations: [
    ProductComponent,
    ButtonComponent,
    ProductDetailsComponent
  ],
    exports: [
        ProductComponent,
        ProductDetailsComponent,
        // CommonModule,
        // BrowserModule,
        // FormsModule,
        // ReactiveFormsModule
    ]
})
export class NikeSharedModule { }
