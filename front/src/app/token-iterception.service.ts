import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenIterceptionService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<string>, next: HttpHandler) {
    const authService = this.injector.get(AuthService);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return next.handle(tokenizedReq);
  }
}

export default TokenIterceptionService;
