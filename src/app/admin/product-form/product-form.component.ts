import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from '../../shared/model/product';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  productId: string;
  categories: [];
  message: {};
  error: {};
  submitted = false;

  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d{1,5}(\.\d{1,2})?$/)
    ]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  });

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private alertervice: AlertService
  ) {
    this.subscription.add(
      this.categoryService.getAll().subscribe(res => {
        this.categories = res;
      }));
    this.productId = this.activatedRouter.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.productId) {
      this.subscription.add(
        this.productService.getById(this.productId).subscribe(
          (res: Product) => {
            if (!res) {
              this.error = `Product with ID=${this.productId} does not exist.`;
              return;
            }
            this.productForm.get('title').setValue(res.title);
            this.productForm.get('price').setValue(res.price);
            this.productForm.get('imageUrl').setValue(res.imageurl);

          },
          err => {
            this.error = 'Incorrect Product ID';
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
            this.successFinish('Successfully updated.');
          },
          (err: HttpErrorResponse) => {
            this.error = err.error.body;
          }
        ));
    } else {
      this.subscription.add(
        this.productService.save(product).subscribe(
          res => {
            this.successFinish('Successfully saved.');
          },
          (err: HttpErrorResponse) => {
            this.error = err.error.body;
          }
        ));
    }
  }

  onCancel() {
    this.router.navigate(['admin/products']);
  }

  private successFinish(message: string) {
    this.submitted = true;
    this.alertervice.showAlert(message, 'success', '/admin/products');
  }

  ngOnDestroy(): void {
    if (this.submitted) {
      this.subscription.unsubscribe();
    }
  }

}
