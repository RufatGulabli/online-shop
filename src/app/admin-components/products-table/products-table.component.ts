import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { ProductTableDataSource } from "./data-source-datatable";

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

  constructor() {}

  ngOnInit() {}
}
