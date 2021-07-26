import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { emailSelector, getEmail } from './reducers/email';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  email: string = ''

  email$ = this.store.select(emailSelector).subscribe(res => this.email = res)
  emails: any

  constructor(private _router: Router,
    private _auth: AuthService,
    private store: Store) { }

  ngOnInit(): void {
    this.emails = this._auth.optionUser()
      .subscribe(
        (res: any) => this.email = res.email,
        err => console.log(err)
      )
  }

  ngOnDestroy(): void {
    this.email$.unsubscribe()
    this.emails.unsubscribe()
  }

  logout = () => {
    this.email = ''
    this.store.dispatch(getEmail({email: ''}))
    localStorage.removeItem('token')
  }
}
