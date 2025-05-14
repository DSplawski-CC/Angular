import {
  HttpRequest, HttpInterceptorFn, HttpHandlerFn, HttpStatusCode, HttpErrorResponse, HttpResponse,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, first, mergeMap, tap, throwError } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { inject } from '@angular/core';


export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const clonedRequest = req.clone({
    url: `${ environment.apiUrl }${ req.url }`,
    setHeaders: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authService.getToken()}`,
    },
  });


  return next(clonedRequest)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          if (err.url?.includes('/auth/refresh')) {
            authService.logout();
            throw new Error(err.message);
          }

          return authService.refreshToken()
            .pipe(
              mergeMap(newToken => {
                const retriedRequest = req.clone({
                  url: `${ environment.apiUrl }${ req.url }`,
                  setHeaders: {
                    'Authorization': `Bearer ${ newToken.accessToken }`,
                  },
                });
                return next(retriedRequest).pipe(
                  catchError((refreshErr: HttpErrorResponse) => {
                    throw new Error(err.message);
                  })
                );
              }),
            );
        }

        authService.logout();
        throw new Error(err.message);
      }
    ));
};
