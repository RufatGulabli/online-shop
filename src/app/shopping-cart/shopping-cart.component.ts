import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';

import { ShoppingCartService } from './../services/shopping-card.service';
import { ProductService } from './../services/product.service';
import { ShoppingCart } from '../model/shopping-card';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  products: ShoppingCart;

  private subscription = new Subscription();

  constructor(
    private shoppingCardService: ShoppingCartService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.subscription.add(this.shoppingCardService.ShoppingCart
      .subscribe(card => {
        if (!card) {
          return;
        }
        this.products = card;
      }));
  }

  add(productId, quantity) {
    this.shoppingCardService
      .addToCart(productId, ++quantity)
      .subscribe();
  }

  remove(productId, quantity) {
    this.shoppingCardService
      .removeFromCart(productId, --quantity)
      .subscribe();
  }

  clear() {
    this.shoppingCardService.clearCart().subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
