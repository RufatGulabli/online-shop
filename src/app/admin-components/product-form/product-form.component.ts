import { HttpErrorResponse } from "@angular/common/http";
import { ProductService } from "../../services/product.service";
import { CategoryService } from "./../../services/category.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Product } from "./../../model/product";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  productForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    price: new FormControl("", [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d{1,5}(\.\d{1,2})?$/)
    ]),
    category: new FormControl("", [Validators.required]),
    imageUrl: new FormControl("", [Validators.required])
  });

  private categories: [];
  private message: {};
  private error: {};
  private submitted: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });
    let productId = this.activatedRouter.snapshot.paramMap.get("id");
    if (productId) {
      this.productService.getById(productId).subscribe((res: Product) => {
        if (!res) {
          this.error = "Something went wrong";
        }
        this.productForm.get("title").setValue(res.title);
        this.productForm.get("price").setValue(res.price);
        this.productForm.get("imageUrl").setValue(res.imageurl);
      });
    }
  }

  onSubmit() {
    const product = {
      title: this.productForm.value.title,
      price: this.productForm.value.price,
      category: this.productForm.value.category.id,
      imageUrl: this.productForm.value.imageUrl
    };
    this.productService.save(product).subscribe(
      res => {
        this.submitted = true;
        this.message = "Succesfully Saved";
        setTimeout(() => {
          this.router.navigate(["/admin/products"]);
        }, 3000);
      },
      (err: HttpErrorResponse) => {
        this.error = err.error.body;
      }
    );
  }

  onCancel() {
    this.router.navigate(["admin/products"]);
  }
}
