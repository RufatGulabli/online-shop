import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import appconfig from '../../assets/appconfig.json';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = `${appconfig.apiUrl}/category`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<[]>(this.url).pipe(catchError(this.errorHandler));
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
