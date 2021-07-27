import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { getEmail } from '../reducers/email';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerUserData = {
    email: '',
    password: '',
    userOption: []
  }

  validationInvalid: boolean = false
  passwordInvalidLength: boolean = false

  constructor(private _auth: AuthService,
    private _router: Router,
    private store: Store) { }

  ngOnInit(): void { }

  change = () => {
    this.validationInvalid = false
    this.passwordInvalidLength = false
  }

  registerUser = () => {
    if (this.registerUserData.email.trim() === '') {
      this.validationInvalid = true
      this.registerUserData.password = ''
      return
    } else if (this.registerUserData.password.length < 6 || this.registerUserData.password.trim() === '') {
      this.passwordInvalidLength = true
      this.registerUserData.password = ''
      return
    } else {
      this.store.dispatch(getEmail({email: this.registerUserData.email}))

      this._auth.registerUser(this.registerUserData)
        .subscribe(
          (res: any) => {
            localStorage.setItem('token', res.token)
            this._router.navigate(['/'])
          },
          err => console.log(err)
        )
    }

    this.registerUserData.email = this.registerUserData.password = ''
  }
}
