import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AuthenticationService, NikeCoreModule } from '@nike-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NikeSharedModule } from '@nike-shared';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { SnackbarService } from '../../../../libs/nike-core/src/lib/services/snackbar.service';
import { FlexLayoutModule } from '@angular/flex-layout';

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
