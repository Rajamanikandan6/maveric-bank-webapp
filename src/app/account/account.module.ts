import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthGuard } from '../authentication/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthIntercaptor } from '../authentication/auth-intercaptor';
import { AccountComponent } from './component/account/account.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard,{ provide: HTTP_INTERCEPTORS, useClass: AuthIntercaptor, multi: true }],
})
export class AccountModule { }
