import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
   //JWT do sistema
  const router = inject(Router);
  const loginService = inject(LoginService);
  
  if (loginService.isAuthenticated()) {
    return true;
  } else {
    alert('Sua Sessão foi expirada, por favor refaça o login')
    router.navigate(['login']);
    return false;
  }
};
