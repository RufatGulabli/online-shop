import { Product } from "./../model/product";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Platform } from "@angular/cdk/platform";
import { CategoryService } from "./../services/category.service";
import { ActivatedRoute } from "@angular/router";
import { Validators } from "@angular/forms";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { MatPaginator } from "@angular/material";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  sideNavOpenToggleButton: boolean;
  windowWidth: number;
  sideNavMode: string;
  length: number;

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
    this.categoryService.getAll().subscribe(cats => {
      this.categories = cats;
    });
    this.activatedRoute.queryParamMap.subscribe(param => {
      if (!param.get("category")) {
        this.getProducts("");
      } else {
        this.productService
          .getByCategory(+param.get("category"))
          .subscribe(prods => {
            this.products = prods;
          });
      }
    });
  }

  ngOnInit(): void {
    this.sideNavMode = this.getSideNavMode();
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.getProducts(this.input.nativeElement.value);
        })
      )
      .subscribe();
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
      this.productService.getAll("", "", 20, 0, filter).subscribe(result => {
        this.products = result;
      });
    } else {
      this.productService.getAll("", "", 20).subscribe(result => {
        this.products = result;
      });
    }
  }

  clearInput() {
    this.input.nativeElement.value = "";
    this.getProducts("");
  }
}
