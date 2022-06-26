import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { AuthenticationService, NikeCoreModule, SnackbarService } from '@nike-core';
import { NikeSharedModule } from '@nike-shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LogoutDialogComponent
  ],
  entryComponents: [LogoutDialogComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NikeCoreModule,
        NikeSharedModule,
        TranslateModule,
        FlexLayoutModule,
    ],
  providers: [AuthenticationService, SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
