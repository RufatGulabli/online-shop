import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Product } from "../model/product";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private url = "http://localhost:3000/product";

  constructor(private http: HttpClient) {}

  save(product) {
    return this.http
      .post<Product>(this.url, product)
      .pipe(catchError(this.errorHandler));
  }

  getAll(
    sortColumn: string = "id",
    sortOrder: string = "asc",
    pageSize: number = 2,
    pageNumber: number = 0
  ): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.url, {
        params: new HttpParams()
          .set("sortColumn", sortColumn)
          .set("sortOrder", sortOrder)
          .set("pageSize", pageSize.toString())
          .set("pageNumber", pageNumber.toString())
      })
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  getCount() {
    return this.http.get(this.url.concat("/count"));
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
