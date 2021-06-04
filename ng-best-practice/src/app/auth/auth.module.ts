import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenInterceptor } from './token-interceptors.service';
import { ErrorInterceptor } from './error-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
})
export class AuthModule { }
