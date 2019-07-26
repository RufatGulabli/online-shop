import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:3000/login';

  private user: User;

  constructor(private httpClient: HttpClient) { }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public getCredentials(): User {
    const token: string = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const user = helper.decodeToken(token) as User;
    return user;
  }

  public login(credentials: any): Observable<any> {
    return this.httpClient
      .post(this.url, credentials)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(error);
    } else if (error.status === 400) {
      return throwError(error);
    }
    return throwError(error);
  }
}
