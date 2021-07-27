import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { getEmail } from '../reducers/email';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService,
    private _router: Router,
    private store: Store) { }

  ngOnInit(): void {
  }

  loginUserData = {
    email: '',
    password: ''
  }

  emailInvalid: boolean = false
  passwordInvalid: boolean = false

  change = () => {
    this.emailInvalid = false
    this.passwordInvalid = false
  }

  loginUser = () => {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        (res: any) => {
          this.store.dispatch(getEmail({email: this.loginUserData.email}))
          localStorage.setItem('token', res.token)
          this.loginUserData.email = this.loginUserData.password = ''
          this._router.navigate(['/'])
        },
        (err)=> {
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
