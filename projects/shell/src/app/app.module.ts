import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AuthenticationService } from '@nike-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NikeSharedModule } from '@nike-shared';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NikeSharedModule,
        TranslateModule
    ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
