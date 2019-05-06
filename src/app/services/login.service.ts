import { User } from "./../model/user";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private url = "http://localhost:3000/login";

  private user: User;

  constructor(private httpClient: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem("Token");
  }

  getCredentials(): User {
    let token = localStorage.getItem("Token");
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const a = helper.decodeToken(token);
    return new JwtHelperService().decodeToken(
      localStorage.getItem("Token")
    ) as User;
  }

  login(credentials: any): Observable<any> {
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
