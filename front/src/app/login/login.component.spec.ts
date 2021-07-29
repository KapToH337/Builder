import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthService } from "../auth.service";

import { LoginComponent } from "./login.component";

describe('LoginComponent', () => {

  let commponent: LoginComponent
  let _auth: AuthService
  let _router: Router
  let store: Store

  beforeEach(() => {
    commponent = new LoginComponent(_auth, _router, store)
  })

  it('should change boolean validation to false', () => {
    commponent.passwordInvalid = false
    commponent.emailInvalid = true

    commponent.change()

    expect(commponent.passwordInvalid).toBe(false)
    expect(commponent.emailInvalid).toBe(false)
  })

})
