import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ControlContainer, NgControl, NgForm } from '@angular/forms';

import { Product } from '../model/product';
import { ShoppingCartService } from '../services/shopping-card.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers: [NgForm],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;  // this is for home page card rendering
  @Input('fg') productForm: FormGroup; //this is for updating and creating new card

  forHomePage: boolean;
  forAdminsPage: boolean;

  @Input() count: number;

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
      this.shoppingCardService.getCountByProductId(this.product.id).subscribe(quantity => {
        this.count = +quantity;
      });
    }
  }

  add() {
    this.shoppingCardService.addToCart(this.product.id, ++this.count)
      .subscribe();
  }

  remove() {
    this.count--;
    this.shoppingCardService.removeFromCart(this.product.id, this.count)
      .subscribe();
  }

}
