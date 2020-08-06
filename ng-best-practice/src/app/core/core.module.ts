import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CoreRoutingModule } from './core-routing.module';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavMenuComponent,
    NotFoundComponent,
    HomeComponent, LoginComponent, RegisterComponent,
    AccessDeniedComponent],
  imports: [
    CommonModule,
    CoreRoutingModule, FormsModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [
    BrowserAnimationsModule,
    NavMenuComponent,
    FooterComponent,
    AccessDeniedComponent
  ],
})
export class CoreModule { }
