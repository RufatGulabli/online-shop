import { DataSource } from "@angular/cdk/table";
import { Product } from "src/app/model/product";
import { ProductService } from "src/app/services/product.service";
import { MatPaginator, MatSort } from "@angular/material";
import { Observable, of as observableOf, merge } from "rxjs";
import { map } from "rxjs/operators";
import { OnInit } from "@angular/core";

export class ProductTableDataSource extends DataSource<Product>
  implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private paginator: MatPaginator,
    private sort: MatSort
  ) {
    super();
  }

  ngOnInit() {
    this.productService.getAll().subscribe(res => {
      this.products = res["body"];
    });
  }

  connect(): Observable<Product[]> {
    const dataMutations = [
      observableOf(this.products),
      this.paginator.page,
      this.sort.sortChange
    ];

    this.paginator.length = this.products["length"];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.products]));
      })
    );
  }

  disconnect() {}

  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === "asc";
      switch (this.sort.active) {
        case "title":
          return compare(a.Title, b.Title, isAsc);
        case "price":
          return compare(+a.Price, +b.Price, isAsc);
        case "category":
          return compare(a.Category, b.Category, isAsc);
        default:
          return 0;
      }
    });
  }

  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
