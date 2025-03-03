import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { LoginService } from "../services/login.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  //JWT do sistema
  const loginService = inject(LoginService);
  const token = loginService.getAuthToken();

  //se nao tiver token ou for invalido
  if (!token || !token.access_token) {
    return next(req);
  }

  //colocando no Headers
  const modified = req.clone({
    setHeaders: {
      Authorization: `${token.token_type} ${token.access_token}`,  
    },
  });

  return next(modified);
};

  

