import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { getEmail } from '../reducers/email';

export interface LoginUserData {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store) { }

  ngOnInit(): void {
  }

  loginUserData: LoginUserData = {
    email: '',
    password: ''
  }

  emailInvalid: boolean = false
  passwordInvalid: boolean = false

  change(): void {
    this.emailInvalid = false
    this.passwordInvalid = false
  }

  loginUser(): void {
    this.authService.loginUser(this.loginUserData)
      .subscribe(
        (res: any) => {
          this.store.dispatch(getEmail({email: this.loginUserData.email}))
          localStorage.setItem('token', res.token)
          this.loginUserData.email = this.loginUserData.password = ''
          this.router.navigate(['/'])
        },
        (err) => {
          if (err.error === 'Invalid email') {
            this.emailInvalid = true
          } else {
            this.passwordInvalid = true
          }
        }
      )

    this.loginUserData.password = ''
  }

}
