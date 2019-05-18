import { Product } from "src/app/model/product";
import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { ProductTableDataSource } from "./product-table-datasource";
import { ProductService } from "src/app/services/product.service";
import { merge } from "rxjs";

@Component({
  selector: "product-table",
  templateUrl: "./product-table.component.html",
  styleUrls: ["./product-table.component.css"]
})
export class ProductTableComponent implements OnInit, AfterViewInit {
  length: number;
  dataSource: ProductTableDataSource;
  displayedColumns = ["Title", "Price", "Category"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
    this.productService.getCount().subscribe(res => {
      this.length = +res;
    });
  }

  ngOnInit() {
    this.dataSource = new ProductTableDataSource(this.productService);
    this.dataSource.loadData("Title".toLowerCase(), "asc", 2, 0);
  }

  ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadProductsAsPerThePagination();
    });
  }

  loadProductsAsPerThePagination() {
    this.dataSource.loadData(
      this.sort.active.toLowerCase(),
      this.sort.direction,
      this.paginator.pageSize,
      this.paginator.pageIndex
    );
  }
}
