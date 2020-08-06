import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private route: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authService = this.injector.get(AuthService);

    return next.handle(req).pipe(catchError(err => {
      if (err.status === 403) {
        authService.logoutUser();
        this.route.navigate(['/no-access']);
      }
      if (err.status === 408) {
        authService.logoutUser();
      }
      return throwError(err);
    }));
  }
}
