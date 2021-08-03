import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { getEmail } from '../reducers/email';

import { LoginUserData } from './login.interfaces';
import { TokenInterface } from '../interface/ItokenInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private store: Store) {}

  // ngOnInit(): void {}

  public loginUserData: LoginUserData = {
    email: '',
    password: '',
  };

  public emailInvalid: boolean = false;

  public passwordInvalid: boolean = false;

  public change(): void {
    this.emailInvalid = false;
    this.passwordInvalid = false;
  }

  public loginUser(): void {
    this.authService.loginUser(this.loginUserData).subscribe(
      (res: TokenInterface) => {
        this.store.dispatch(getEmail({ email: this.loginUserData.email }));
        localStorage.setItem('token', String(res.token));
        this.router.navigate(['/']);
      },
      (err) => {
        if (err.error === 'Invalid email') {
          this.emailInvalid = true;
        } else {
          this.passwordInvalid = true;
        }
      },
    );

    this.loginUserData.password = '';
  }
}

export default LoginComponent;
