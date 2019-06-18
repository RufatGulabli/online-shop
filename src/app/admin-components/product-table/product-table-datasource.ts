import { ProductService } from "src/app/services/product.service";
import { DataSource } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";
import { Observable, BehaviorSubject, of } from "rxjs";
import { Product } from "../../model/product";

export class ProductTableDataSource extends DataSource<Product> {
  private data = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable(); // this is for spinner
  public dataLength: number = 0;

  constructor(private productService: ProductService) {
    super();
  }

  connect(): Observable<Product[]> {
    return this.data;
  }

  disconnect() {
    // below are for unsubsribing from above 2 BehaviorSubject Observales
    // in case of memory leaks
    this.data.complete();
    this.loadingSubject.complete();
  }

  loadData(
    sortColumn: string = "id",
    sortOrder: string = "asc",
    pageSize: number = 2,
    pageNumber: number = 1,
    filter: string = ""
  ) {
    // spinner will get true value while loading the data from backend
    this.loadingSubject.next(true);
    this.productService
      .getAll(sortColumn, sortOrder, pageSize, pageNumber + 1, filter)
      .pipe(
        // in case of error,  an Observable of empty array will be returned
        catchError(() => of([])),
        // spinner will get false value by subscribing to an observable once
        // the data returned from backend
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(products => {
        this.data.next(products);
        this.dataLength = products.length;
      });
  }
}
