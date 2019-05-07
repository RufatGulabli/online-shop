import { HttpErrorResponse } from "@angular/common/http";
import { ProductService } from "../../services/product.service";
import { CategoryService } from "./../../services/category.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  productForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    imageUrl: new FormControl("", [Validators.required])
  });

  private categories: [];
  private message;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  onSubmit() {
    this.productService.save(this.productForm.value).subscribe(
      res => {
        console.log(res);
        this.message = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        this.message = err.message;
      }
    );
  }
}
