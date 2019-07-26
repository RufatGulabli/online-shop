import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  // This method is used to add Token to all HTTP requests' headers automatically
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const setTokenToHeader = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(setTokenToHeader);
  }
}
