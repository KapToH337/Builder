import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { emailSelector, getEmail } from './reducers/email';

import { UserOption } from './interface/IuserOption';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private unsubscribe$ = new Subject();

  public email?: string = '';

  private email$: Subscription = this.store
    .select(emailSelector)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res) => { this.email = res; });

  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.authService
      .getOptionUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res: UserOption) => { this.email = res.email; },
        (err) => console.log(err),
      );
  }

  public logout() {
    this.email = '';
    this.store.dispatch(getEmail({ email: '' }));
    localStorage.removeItem('token');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

export default AppComponent;
