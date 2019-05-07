import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private url = "http://localhost:3000/product";

  constructor(private http: HttpClient) {}

  save(product) {
    return this.http
      .post(this.url, product)
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
