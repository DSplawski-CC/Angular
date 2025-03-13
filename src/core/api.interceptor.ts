import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpInterceptorFn, HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return apiInterceptor(request, next.handle);
  }
}

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const clonedRequest = req.clone({
    url: `${ environment.apiUrl }${ req.url }`,
    setHeaders: {
      'Content-Type': 'application/json',
      'x-token': 'bearer token',
    },
  });

  return next(clonedRequest);
};
