import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { emailSelector, getEmail } from './reducers/email';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  email: string = ''

  email$: Subscription = this.store.select(emailSelector).subscribe(res => this.email = res)

  constructor(private authService: AuthService,
    private store: Store) { }

  ngOnInit(): void {
    this.email$ = this.authService.optionUser()
      .subscribe(
        (res: any) => this.email = res.email,
        err => console.log(err)
      )
  }

  logout() {
    this.email = ''
    this.store.dispatch(getEmail({email: ''}))
    localStorage.removeItem('token')
  }
  
  ngOnDestroy(): void {
    this.email$.unsubscribe()
  }
}
