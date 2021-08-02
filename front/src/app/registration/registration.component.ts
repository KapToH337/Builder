import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { getEmail } from '../reducers/email';

import { registerUesrDatat } from './registration.interfaces';
import { tokenInterface } from '../interface/ItokenInterface';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registerUserData: registerUesrDatat = {
    email: '',
    password: '',
    userOption: []
  }

  public form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(6)
    ])
  })

  public emailInvalid: boolean = false
  public passwordInvalid: boolean = false

  constructor(private authService: AuthService,
    private router: Router,
    private store: Store) { }

  ngOnInit(): void {}

  public change(): void {
    this.emailInvalid = false
    this.passwordInvalid = false
  }

  private sendUserData(): void {
    this.store.dispatch(getEmail({email: this.registerUserData.email}))

    this.authService.registerUser(this.registerUserData)
      .subscribe(
        (res: tokenInterface) => {
          localStorage.setItem('token', String(res.token))
          this.router.navigate(['/'])
        },
        err => console.log(err)
      )
  }

  public registerUser(): void {
    this.registerUserData.email = this.form.value.email
    this.registerUserData.password = this.form.value.password

    if (this.form.get('email')?.invalid) {
      this.emailInvalid = true
      this.form.patchValue({ password: '' })
    } else if (this.form.get('password')?.invalid) {
      this.passwordInvalid = true
      this.form.patchValue({ password: '' })
    } else {
      this.sendUserData()
    }
  }
}
