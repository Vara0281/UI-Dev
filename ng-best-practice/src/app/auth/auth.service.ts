import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '@shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  jwtHelper = new JwtHelperService();

  private registerUrl = 'http://localhost:3000/api/users';
  private loginUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  registerUser(user: User) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('AccessToken');
  }

  getToken() {
    return localStorage.getItem('AccessToken');
  }

  get currentUser() {
    const AccessToken = localStorage.getItem('AccessToken');
    if (!AccessToken) { return null; }
    return this.jwtHelper.decodeToken(AccessToken);
  }

  logoutUser() {
    localStorage.removeItem('AccessToken');
  }
}
