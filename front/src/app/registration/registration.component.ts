import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private _router: Router) { }

  ngOnInit(): void { }

  registerUser = () => {
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