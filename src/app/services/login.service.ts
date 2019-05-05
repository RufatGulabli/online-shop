import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private url = "http://localhost:3000/login";
  constructor(private httpClient: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  login(credentials: any): Observable<any> {
    console.log(JSON.stringify(credentials));
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
