import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Product } from '../shared/model/product';
import appconfig from '../../assets/appconfig.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${appconfig.apiUrl}/product`;

  constructor(private http: HttpClient) { }

  save(product) {
    return this.http
      .post(this.url, product)
      .pipe(catchError(this.errorHandler));
  }

  getAll(
    sortColumn: string = 'title',
    sortOrder: string = 'asc',
    pageSize: number = 2,
    pageNumber: number = 0,
    filter: string = ''
  ): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.url, {
        params: new HttpParams()
          .set('sortColumn', sortColumn)
          .set('sortOrder', sortOrder)
          .set('pageSize', pageSize.toString())
          .set('pageNumber', pageNumber.toString())
          .set('filter', filter)
      })
      .pipe(
        map(res => res),
        catchError(this.errorHandler)
      );
  }

  getById(id): Observable<Product> {
    return this.http
      .get<Product>(this.url.concat('/' + id))
      .pipe(catchError(this.errorHandler));
  }

  getByCategory(id: number, pageSize: number, pageNumber: number): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.url.concat('/category/').concat(id.toString()), {
        params: new HttpParams()
          .set('pageSize', pageSize.toString())
          .set('pageNumber', pageNumber.toString())
      })
      .pipe(catchError(this.errorHandler));
  }

  update(product) {
    return this.http.put(this.url, product).pipe(catchError(this.errorHandler));
  }

  remove(id) {
    return this.http
      .delete(this.url.concat('/' + id))
      .pipe(catchError(this.errorHandler));
  }

  getCount(category: number) {
    if (category) {
      return this.http.get<number>(this.url.concat('/getCountByCategory/'.concat(category.toString())));
    } else {
      return this.http.get<number>(this.url.concat('/count'));
    }
  }

  getCountByFilter(filter) {
    return this.http.get<number>(this.url.concat('/getCount/ByFilter/'.concat(filter)));
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
