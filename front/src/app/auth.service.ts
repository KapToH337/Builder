import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenInterface } from './interface/ItokenInterface';
import { userOption } from './interface/IuserOption';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  constructor(private http: HttpClient) { }

  //go to server
  public registerUser(user: object): Observable<tokenInterface> {
    return this.http.post(this._registerUrl, user)
  }

  public loginUser(user: object): Observable<tokenInterface> {
    return this.http.post(this._loginUrl, user)
  }

  public getLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  public getToken(): string | null {
    return localStorage.getItem('token')
  }

  public getOptionUser(): Observable<userOption> {
    return this.http.get(this._loginUrl)
  }

  public optionUserChange(user: object): Observable<object> {
    return this.http.put(this._loginUrl, user)
  }

}
