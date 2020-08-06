import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = { email: '', password: '' };
  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() { }

  loginUser() {
    this.auth.loginUser(this.user)
      .subscribe(
        res => {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          localStorage.setItem('AccessToken', res.AccessToken);
          this.router.navigate([returnUrl || '/']);
        },
        err => this.toastr.error(err.error.message, 'Invalid Login',
          { timeOut: 6000, closeButton: true })
      );
  }

}
