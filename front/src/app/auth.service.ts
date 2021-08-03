import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenInterface } from './interface/ItokenInterface';
import { UserOption } from './interface/IuserOption';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:3000/api/register';

  private loginUrl = 'http://localhost:3000/api/login';

  private currentToken!: string;

  private currentLoggedIn!: boolean;

  constructor(private http: HttpClient) {}

  // go to server
  public registerUser(user: object): Observable<TokenInterface> {
    return this.http.post(this.registerUrl, user);
  }

  public loginUser(user: object): Observable<TokenInterface> {
    return this.http.post(this.loginUrl, user);
  }

  public getLoggedIn(): boolean {
    this.currentLoggedIn = !!localStorage.getItem('token');
    return this.currentLoggedIn;
  }

  public getToken(): string | null {
    this.currentToken = localStorage.getItem('token')!;
    return this.currentToken;
  }

  public getOptionUser(): Observable<UserOption> {
    return this.http.get(this.loginUrl);
  }

  public optionUserChange(user: object): Observable<object> {
    return this.http.put(this.loginUrl, user);
  }
}

export default AuthService;
