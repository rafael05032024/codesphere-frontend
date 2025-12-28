import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthContextService } from '../../services/auth-context.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthContextService);
  const router = inject(Router);

  if (authService.token) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
