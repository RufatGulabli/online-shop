import { Product } from "src/app/model/product";
import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { ProductTableDataSource } from "./product-table-datasource";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "product-table",
  templateUrl: "./product-table.component.html",
  styleUrls: ["./product-table.component.css"]
})
export class ProductTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ProductTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["Id", "Title", "Price", "Category"];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.dataSource = new ProductTableDataSource(
      this.productService,
      this.paginator,
      this.sort
    );
  }
}
