import {
  HttpRequest, HttpInterceptorFn, HttpHandlerFn, HttpStatusCode, HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { inject } from '@angular/core';


export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  console.log(req.url, req.headers.get('Authorization'));
  const clonedRequest = req.clone({
    url: `${ environment.apiUrl }${ req.url }`,

    setHeaders: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authService.getToken()}`,
    },
  });

  console.log(clonedRequest.url, clonedRequest.headers.get('Authorization'));

  return next(clonedRequest)
    .pipe(tap({
      error: (err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          authService.logout();
        }
      }
    }),
    )
};
