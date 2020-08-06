import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { autoClose: true } }]
})
export class NavMenuComponent {
  collapse = false;
  constructor(private router: Router, public authService: AuthService) { }

  navCollapse() {
    this.collapse = !this.collapse;
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
}
