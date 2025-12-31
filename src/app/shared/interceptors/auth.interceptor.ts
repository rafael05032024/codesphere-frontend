import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { SessionService } from '../../services/session.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const session = inject(SessionService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Evita loop infinito
        if (router.url !== '/login') {
          session.end().subscribe(() => {
            router.navigate(['/login']);
          });
        }
      }

      return throwError(() => error);
    })
  );
};
