import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AuthService: AuthService,
    private Router: Router) { }

    public canActivate(): boolean {
      if (this.AuthService.getLoggedIn()) {
        return true
      } else {
        this.Router.navigate(['/login'])
        return false
      }
    }
}
