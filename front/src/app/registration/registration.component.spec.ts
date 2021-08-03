import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let commponent: RegistrationComponent;
  let authService: AuthService;
  let router: Router;
  let store: Store;

  beforeEach(() => {
    commponent = new RegistrationComponent(authService, router, store);
  });

  it('should change boolean validation to false', () => {
    commponent.passwordInvalid = false;
    commponent.emailInvalid = true;

    commponent.change();

    expect(commponent.passwordInvalid).toBe(false);
    expect(commponent.emailInvalid).toBe(false);
  });

  it('should change boolean validation if email invalid', () => {
    commponent.registerUserData.email = '   ';

    commponent.registerUser();

    expect(commponent.emailInvalid).toBe(true);
  });

  it('should change boolean validation if password invalid', () => {
    commponent.registerUserData.email = 'user@.com';
    commponent.registerUserData.password = 'abv';

    commponent.registerUser();

    expect(commponent.passwordInvalid).toBe(true);
  });
});
