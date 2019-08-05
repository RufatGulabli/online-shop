import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

import { ProductService } from 'src/app/services/product.service';
import { ShoppingCart, ShoppingCartItem } from '../shared/model/shopping-card';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private _shoppingCart = new BehaviorSubject<ShoppingCart>(null);

  constructor(private productService: ProductService) {
    const card = localStorage.getItem('shopping-card');
    if (!card) {
      const shopCard = new ShoppingCart(new Map<number, ShoppingCartItem>(), 0);
      this._shoppingCart.next(shopCard);
    } else {
      const parsedObject = JSON.parse(localStorage.getItem('shopping-card'));
      const arrayToMap = new Map<number, ShoppingCartItem>(parsedObject.products);
      const shoppingCard = new ShoppingCart(arrayToMap, parsedObject.total, parsedObject.id);
      this._shoppingCart.next(shoppingCard);
    }
  }

  get ShoppingCart() {
    return this._shoppingCart.asObservable();
  }

  addToCart(productID: number, quantity: number) {
    return this._shoppingCart.pipe(
      take(1),
      tap(card => {
        this.productService.getById(productID)
          .subscribe(prod => {
            if (card.productSet.has(productID)) {
              card.productSet.get(productID).quantity = quantity;
            } else {
              const shoppinCartItem = new ShoppingCartItem(prod, quantity);
              card.productSet.set(productID, shoppinCartItem);
            }
            card.total++;
            this._shoppingCart.next(card);
            this.setToLocalStorage(card);
          });
      })
    );
  }

  removeFromCart(productID: number, quantity: number) {
    return this._shoppingCart.pipe(
      take(1),
      tap(card => {
        if (quantity <= 0) {
          card.productSet.delete(productID);
        } else {
          card.productSet.get(productID).quantity = quantity;
        }
        card.total--;
        this._shoppingCart.next(card);
        this.setToLocalStorage(card);
      })
    );
  }

  getCountByProductId(productId: number) {
    return this._shoppingCart.pipe(
      take(1),
      map(card => {
        let count = 0;
        if (card.productSet.has(productId)) {
          count = card.productSet.get(productId).quantity;
        }
        return count;
      })
    );
  }

  clearCart() {
    return this.ShoppingCart.pipe(
      take(1),
      tap(card => {
        card.productSet.clear();
        card.total = 0;
        this._shoppingCart.next(card);
        localStorage.setItem('shopping-card', JSON.stringify(card));
      })
    );
  }

  private setToLocalStorage(shoppingCard: ShoppingCart) {
    const mapToArr = Array.from(shoppingCard.productSet.entries());
    const obj = {
      products: mapToArr,
      total: shoppingCard.total,
      id: shoppingCard.Id
    };
    localStorage.setItem('shopping-card', JSON.stringify(obj));
  }


}
