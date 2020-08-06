import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router) { }

  canActivate(): boolean {
    if (this.authService.currentUser.isAdmin) { return true; }

    this.route.navigate(['/no-access']);
    return false;
  }
}
