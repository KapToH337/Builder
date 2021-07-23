import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private _loginedUrl = "http://localhost:3000/api/logined"
  constructor(private http: HttpClient) { }

  registerUser = (user: object) => {
    return this.http.post(this._registerUrl, user)
  }

  loginUser = (user: object) => {
    return this.http.post(this._loginUrl, user)
  }

  loggedIn = () => {
    return !!localStorage.getItem('token')
  }

  getToken = () => {
    return localStorage.getItem('token')
  }

  loginedUser = (user: object) => {
    return this.http.put(this._loginUrl, user)
  }

  optionUser = () => {
    return this.http.get(this._loginedUrl)
  }
}
