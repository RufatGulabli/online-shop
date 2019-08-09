import { User } from '../shared/model/user';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import appconfig from '../../assets/appconfig.json';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${appconfig.apiUrl}`;

  private user = new BehaviorSubject<User>(null);

  private expires;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private router: Router
  ) {
    this.User.pipe(take(1)).subscribe(user => {
      const token = localStorage.getItem('token');
      if (!token) {
        this.user.next(null);
      } else {
        const helper = new JwtHelperService();
        user = helper.decodeToken(token) as User;
        this.expires = new Date(0).setUTCSeconds(user['exp']);
        if (this.sessionExpired()) {
          this.user.next(null);
        } else {
          this.user.next(user);
        }
      }
      setInterval(() => {
        if (this.sessionExpired() && localStorage.getItem('token')) {
          this.alertService.showAlert('Session Expired. Please log in again.', 'warn');
          this.logOut().subscribe();
          this.router.navigate(['/']);
        }
      }, 2000);
    });
  }

  public isLoggedIn(): boolean {
    if (this.sessionExpired()) {
      return null;
    }
    return !!localStorage.getItem('token');
  }

  get User(): Observable<User> {
    return this.user.asObservable();
  }

  public login(credentials: any): Observable<any> {
    return this.http.post(this.url.concat('/login'), credentials)
      .pipe(
        tap((token: string) => {
          localStorage.setItem('token', token);
          this.User.pipe(take(1)).subscribe(() => {
            const helper = new JwtHelperService();
            const decoded = helper.decodeToken(token) as User;
            this.expires = new Date(0).setUTCSeconds(decoded['exp']);
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

  private sessionExpired() {
    if (this.expires - new Date().getTime() <= 0) {
      return true;
    }
    return false;
  }
}
