import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  OnDestroy
} from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { ProductTableDataSource } from "./product-table-datasource";
import { ProductService } from "src/app/services/product.service";
import { merge, fromEvent, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { DeleteProductDialogComponent } from "./delete-product-dialog/delete-product-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: "product-table",
  templateUrl: "./product-table.component.html",
  styleUrls: ["./product-table.component.css"]
})
export class ProductTableComponent implements OnInit, AfterViewInit, OnDestroy {
  length: number;
  dataSource: ProductTableDataSource;
  displayedColumns = ["Title", "Price", "Category", "edit", "delete"];
  private subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("input") input: ElementRef;

  constructor(
    private productService: ProductService,
    private matDialog: MatDialog,
    private router: Router
  ) {
    this.subscription.add(this.productService.getCount(null).subscribe(res => {
      this.length = +res;
    }));
  }

  ngOnInit() {
    this.dataSource = new ProductTableDataSource(this.productService);
    this.dataSource.loadData("Title".toLowerCase(), "asc", 10, 0, "");
  }

  ngAfterViewInit(): void {

    this.subscription.add(fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProductsAsPerThePagination();

        })
      )
      .subscribe(() => {
        this.paginator.length =
          this.dataSource.dataLength / this.paginator.pageSize > 1
            ? this.length
            : 1;
        // this.productService.getCountByFilter(this.input.nativeElement.value)
        //   .subscribe(count => this.length = count);
      }));

    this.subscription.add(merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadProductsAsPerThePagination();
    }));

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

  delete(product) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.maxWidth = "350px";
    dialogConfig.height = "200px";
    dialogConfig.data = {
      title: product["title"]
    };

    let dialogRef = this.matDialog.open(
      DeleteProductDialogComponent,
      dialogConfig
    );

    this.subscription.add(dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.subscription.add(this.productService.remove(product["id"]).subscribe(res => {
          this.loadProductsAsPerThePagination();
          this.length--;
        }));
      } else {
        return;
      }
    }));

  }

  update(id) {
    this.router.navigate(["admin/products/", id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.dataSource.disconnect();
  }
}