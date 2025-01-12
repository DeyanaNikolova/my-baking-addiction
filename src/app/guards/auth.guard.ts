import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const userService = inject(UserService);
  const router = inject(Router);
  const authService = inject(AuthService);
  if(userService.isLogged){
    return true;
  }else{
    authService.removeAuth();
    return router.navigateByUrl('/login');
  }
};
