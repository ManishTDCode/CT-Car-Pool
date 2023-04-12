import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ReqInterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('idToken');
    const modifiedReq = req.clone({
      headers: req.headers.set('auth', `${token}`),
    });
    return next.handle(modifiedReq)
      .pipe(catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert('User is unauthorized');
          }
          else if (err.status === 500) {
            alert('Internal server error');
          }
          else if (err.status === 404) {
            alert('Page not found');
          }
          else {
            alert('something went wrong while connecting to server');
          }
        }

        return new Observable<HttpEvent<any>>();
      }));
  }
}
