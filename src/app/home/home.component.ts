import { Product } from "./../model/product";
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { ProductService } from "../services/product.service";
import { CategoryService } from "./../services/category.service";
import { ActivatedRoute } from "@angular/router";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { MatPaginator, MatPaginatorIntl } from "@angular/material";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  sideNavOpenToggleButton: boolean = false;
  windowWidth: number;
  sideNavMode: string;
  length: number;
  private subscription = new Subscription(); // in order to unsubsribe from all observable in one go

  @ViewChild("input") input: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  products: Product[] = [];
  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {

    this.windowWidth = window.innerWidth;

    this.subscription.add(this.categoryService.getAll().subscribe(cats => {
      this.categories = cats;
    }));

  }

  ngOnInit(): void {

    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;

    this.subscription.add(
      this.activatedRoute.queryParamMap.subscribe(param => {
        let categoryId = param.get("category") || null;
        this.paginator.pageIndex = 0;
        if (this.input.nativeElement.value) this.input.nativeElement.value = "";
        if (categoryId === null) {
          this.getCount("");
          this.getProducts("");
        } else {
          this.paginator.pageIndex = 0;
          this.subscription.add(this.productService.getByCategory(
            +param.get("category"),
            this.paginator.pageSize,
            this.paginator.pageIndex)
            .subscribe(prods => {
              this.products = prods;
              this.getCount(categoryId);
            }));
        }
      }));

    this.sideNavMode = this.getSideNavMode();
  }

  ngAfterViewInit(): void {

    this.subscription.add(
      fromEvent(this.input.nativeElement, "keyup")
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
          tap(() => {
            this.paginator.pageIndex = 0;
            this.getProducts(this.input.nativeElement.value);
            this.getCountByFilter(this.input.nativeElement.value);
          })
        )
        .subscribe());

    this.subscription.add(
      this.paginator.page.subscribe(() => {
        let category = this.activatedRoute.queryParams["value"]["category"] || null;
        let filter = this.input.nativeElement.value;
        if (filter) {
          this.getProducts(filter);
          this.getCountByFilter(filter);
        }
        else if (category === null) {
          this.subscription.add(
            this.productService.getAll("title", "asc", this.paginator.pageSize, this.paginator.pageIndex + 1)
              .subscribe(data => {
                this.products = data;
              }));
        } else {
          this.subscription.add(
            this.productService.getByCategory(category, this.paginator.pageSize, this.paginator.pageIndex + 1)
              .subscribe(data => {
                this.products = data;
              })
          )
        }
      }));
  }

  private getSideNavMode() {
    if (this.windowWidth <= 1024) {
      this.sideNavOpenToggleButton = false;
      return "over";
    } else {
      this.sideNavOpenToggleButton = true;
      return "side";
    }
  }

  private getProducts(filter) {
    if (filter) {
      this.subscription.add(
        this.productService.getAll("title", "asc", this.paginator.pageSize, this.paginator.pageIndex + 1, filter)
          .subscribe((result: Product[]) => {
            this.products = result;
          }));
    } else {
      this.subscription.add(
        this.productService.getAll("title", "asc", this.paginator.pageSize).subscribe((result: Product[]) => {
          this.products = result;
        }));
    }
  }

  private getCount(category) {
    this.subscription.add(
      this.productService.getCount(category).subscribe((result: number) => {
        this.length = +result;
      })
    );
  }

  private getCountByFilter(filter) {
    this.subscription.add(
      this.productService.getCountByFilter(filter).subscribe(count => {
        this.length = count;
      }));
  }

  clearInput() {
    this.input.nativeElement.value = "";
    this.getProducts("");
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}