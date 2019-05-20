import { Product } from "src/app/model/product";
import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ElementRef
} from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { ProductTableDataSource } from "./product-table-datasource";
import { ProductService } from "src/app/services/product.service";
import { merge, fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";

@Component({
  selector: "product-table",
  templateUrl: "./product-table.component.html",
  styleUrls: ["./product-table.component.css"]
})
export class ProductTableComponent implements OnInit, AfterViewInit {
  length: number;
  dataSource: ProductTableDataSource;
  displayedColumns = ["Title", "Price", "Category", "edit", "delete"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("input") input: ElementRef;

  constructor(private productService: ProductService) {
    this.productService.getCount().subscribe(res => {
      this.length = +res;
    });
  }

  ngOnInit() {
    this.dataSource = new ProductTableDataSource(this.productService);
    this.dataSource.loadData("Title".toLowerCase(), "asc", 10, 0, "");
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProductsAsPerThePagination();
        })
      )
      .subscribe();
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadProductsAsPerThePagination();
    });
  }

  loadProductsAsPerThePagination() {
    this.dataSource.loadData(
      this.sort.active.toLowerCase(),
      this.sort.direction,
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.input.nativeElement.value
    );
  }

  clearInput() {
    this.input.nativeElement.value = "";
    this.loadProductsAsPerThePagination();
  }

  delete(id) {
    this.productService.remove(id).subscribe(result => {
      console.log(result);
    });
  }
}
