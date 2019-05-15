import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { ProductTableDataSource } from "./data-source-datatable";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "products-table",
  templateUrl: "./products-table.component.html",
  styleUrls: ["./products-table.component.css"]
})
export class ProductsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ["Title", "Price", "Category", " "];

  dataSource: ProductTableDataSource;

  errorMessage: string = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.dataSource = new ProductTableDataSource(
      this.productService,
      this.paginator,
      this.sort
    );
  }
}
