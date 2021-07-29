import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { getEmail } from '../reducers/email';

export interface RegisterUsrDatat {
  email: string,
  password: string,
  userOption: Array<object>
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerUserData: RegisterUsrDatat = {
    email: '',
    password: '',
    userOption: []
  }

  emailInvalid: boolean = false
  passwordInvalidLength: boolean = false

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store) { }

  ngOnInit(): void { }

  change(): void {
    this.emailInvalid = false
    this.passwordInvalidLength = false
  }

  registerUser(): void {
    if (this.registerUserData.email.trim() === '') {
      this.emailInvalid = true
      this.registerUserData.password = ''
      return
    } else if (this.registerUserData.password.length < 6 || this.registerUserData.password.trim() === '') {
      this.passwordInvalidLength = true
      this.registerUserData.password = ''
      return
    } else {
      this.store.dispatch(getEmail({email: this.registerUserData.email}))

      this.authService.registerUser(this.registerUserData)
        .subscribe(
          (res: any) => {
            localStorage.setItem('token', res.token)
            this.router.navigate(['/'])
          },
          err => console.log(err)
        )
    }

    this.registerUserData.email = this.registerUserData.password = ''
  }
}
