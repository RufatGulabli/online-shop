import { User } from '../shared/model/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:3000';

  private user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {

    this.User.pipe(take(1)).subscribe(user => {
      const token = localStorage.getItem('token');
      if (!token) {
        this.user.next(null);
      } else {
        const helper = new JwtHelperService();
        user = helper.decodeToken(token) as User;
        this.user.next(user);
      }
    });
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get User(): Observable<User> {
    return this.user.asObservable();
  }

  public getCredentials() {
    // return this.user
  }

  public login(credentials: any): Observable<any> {
    return this.http.post(this.url.concat('/login'), credentials)
      .pipe(
        tap((token: string) => {
          localStorage.setItem('token', token);
          this.User.pipe(take(1)).subscribe(() => {
            const helper = new JwtHelperService();
            const decoded = helper.decodeToken(token) as User;
            this.user.next(decoded);
          });
        }),
        catchError(this.errorHandler));
  }

  signup(credentials: any): Observable<any> {
    return this.http.post(this.url.concat('/signup'), credentials)
      .pipe(
        tap((token: string) => {
          localStorage.setItem('token', token);
          this.User.pipe(take(1)).subscribe(() => {
            const helper = new JwtHelperService();
            const decoded = helper.decodeToken(token) as User;
            this.user.next(decoded);
          });
        }),
        catchError(this.errorHandler));
  }

  logOut() {
    return this.User.pipe(
      take(1),
      tap(() => {
        this.user.next(null);
        localStorage.removeItem('token');
      }));
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
