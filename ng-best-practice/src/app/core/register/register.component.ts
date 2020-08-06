import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '@shared/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string;
  user: User = { name: '', email: '', password: '' };
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService) { }

  ngOnInit() {
  }

  registerUser() {
    this.auth.registerUser(this.user)
      .subscribe(res => {
        localStorage.setItem('AccessToken', res.AccessToken);
        this.router.navigate(['/']);
      },
        err => this.toastr.error(err.error.message, 'Please Check')
      );
  }

}
