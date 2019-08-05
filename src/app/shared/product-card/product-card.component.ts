import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, ControlContainer, NgForm } from '@angular/forms';

import { Product } from '../model/product';
import { ShoppingCartService } from '../../services/shopping-card.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers: [NgForm],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input('product') product: Product;  // this is for home page card rendering
  @Input('fg') productForm: FormGroup; //this is for updating and creating new card
  @Input() count: number;

  forHomePage: boolean;
  forAdminsPage: boolean;

  private subscription = new Subscription();

  constructor(
    private controlContainer: ControlContainer,
    private shoppingCardService: ShoppingCartService
  ) {
    this.productForm = this.controlContainer.control as FormGroup;
    this.count = this.count === undefined ? 0 : this.count;
  }

  ngOnInit(): void {
    if (this.product) {
      this.forHomePage = true;
      this.forAdminsPage = false;
    } else {
      this.forHomePage = false;
      this.forAdminsPage = true;
    }
    if (this.forHomePage) {
      this.subscription.add(
        this.shoppingCardService.getCountByProductId(this.product.id).subscribe(quantity => {
          this.count = +quantity;
        }));
    }
  }

  add() {
    this.subscription.add(
      this.shoppingCardService.addToCart(this.product.id, ++this.count)
        .subscribe());
  }

  remove() {
    this.count--;
    this.subscription.add(
      this.shoppingCardService.removeFromCart(this.product.id, this.count)
        .subscribe());
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
