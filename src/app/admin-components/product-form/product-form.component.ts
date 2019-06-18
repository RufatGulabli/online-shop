import { HttpErrorResponse } from "@angular/common/http";
import { ProductService } from "../../services/product.service";
import { CategoryService } from "./../../services/category.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Product } from "./../../model/product";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  productId: string;
  categories: [];
  message: {};
  error: {};
  submitted: boolean = false;

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

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.subscription.add(
      this.categoryService.getAll().subscribe(res => {
        this.categories = res;
      }));
    this.productId = this.activatedRouter.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    if (this.productId) {
      this.subscription.add(
        this.productService.getById(this.productId).subscribe(
          (res: Product) => {
            if (res["length"] === 0) {
              this.error = `Product with ID=${this.productId} does not exist.`;
              return;
            }
            this.productForm.get("title").setValue(res[0].title);
            this.productForm.get("price").setValue(res[0].price);
            this.productForm.get("imageUrl").setValue(res[0].imageurl);

          },
          err => {
            this.error = "Incorrect Product ID";
          }
        ));
    }
  }

  onSubmit() {
    const product = {
      id: this.productId,
      title: this.productForm.value.title,
      price: this.productForm.value.price,
      category: this.productForm.value.category.id,
      imageUrl: this.productForm.value.imageUrl
    };
    if (this.productId) {
      this.subscription.add(
        this.productService.update(product).subscribe(
          res => {
            this.successFinish("updated");
          },
          (err: HttpErrorResponse) => {
            this.error = err.error.body;
          }
        ));
    } else {
      this.subscription.add(
        this.productService.save(product).subscribe(
          res => {
            this.successFinish("saved");
          },
          (err: HttpErrorResponse) => {
            this.error = err.error.body;
          }
        ));
    }
  }

  onCancel() {
    this.router.navigate(["admin/products"]);
  }

  private successFinish(message: string) {
    this.message = `Succesfully ${message}`;
    this.submitted = true;
    setTimeout(() => {
      this.router.navigate(["/admin/products"]);
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
