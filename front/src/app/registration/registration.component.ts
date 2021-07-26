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

  constructor(private _auth: AuthService,
    private _router: Router,
    private store: Store) { }

  ngOnInit(): void { }

  registerUser = () => {
    this.store.dispatch(getEmail({email: this.registerUserData.email}))

    if (this.registerUserData.email.trim() === '' || this.registerUserData.password.trim() === '') {
      this.registerUserData.password = ''
      return
    } else {
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
