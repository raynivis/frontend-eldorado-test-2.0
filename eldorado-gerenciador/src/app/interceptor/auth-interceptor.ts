import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { LoginService } from "../services/login.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  //JWT do sistema
  const authService = inject(LoginService);
  const token = authService.getAuthToken();

  //se nao tiver token
  if (!token) {
    return next(req);
  }

  //colocando no Headers
  const modified = req.clone({
    setHeaders: {
      Authorization: `${token.token_type} ${token.access_token}`,  //nao consegui pensar em um jeito de usar o token.
    },
  });

  return next(modified);
};

  

