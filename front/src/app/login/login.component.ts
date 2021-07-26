import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
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

  loginUser = () => {
    this.store.dispatch(getEmail({email: this.loginUserData.email}))
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token)
          this.loginUserData.email = this.loginUserData.password = ''
          this._router.navigate(['/'])
        },
        err => console.log(err)
      )

    this.loginUserData.password = ''
  }

}
