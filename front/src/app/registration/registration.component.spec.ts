import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService } from "../auth.service";

import { RegistrationComponent } from "./registration.component";

describe('RegistrationComponent', () => {

  let commponent: RegistrationComponent
  let _auth: AuthService
  let _router: Router
  let store: Store

  beforeEach(() => {
    commponent = new RegistrationComponent(_auth, _router, store)
  })

  it('should change boolean validation to false', () => {
    commponent.passwordInvalidLength = false
    commponent.emailInvalid = true

    commponent.change()

    expect(commponent.passwordInvalidLength).toBe(false)
    expect(commponent.emailInvalid).toBe(false)
  })

  it('should change boolean validation if email invalid', () => {
    commponent.registerUserData.email = '   '

    commponent.registerUser()

    expect(commponent.emailInvalid).toBe(true)
  })

  it('should change boolean validation if password invalid', () => {
    commponent.registerUserData.email = 'user@.com'
    commponent.registerUserData.password = 'abv'

    commponent.registerUser()

    expect(commponent.passwordInvalidLength).toBe(true)
  })

})
