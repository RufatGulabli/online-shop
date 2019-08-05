import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Order } from '../shared/model/order';
import { OrderItem } from '../shared/model/order-item';
import { LoginService } from './login.service';
import { ShippingAddress } from '../shared/model/shipping-address';
import { ShoppingCartService } from './shopping-card.service';
import { take, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'http://localhost:3000/order';

  constructor(
    private loginService: LoginService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private http: HttpClient
  ) { }

  place(address: ShippingAddress): Observable<number> {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: '/check-out',
          address: JSON.stringify(address)
        }
      });
      return of(null);
    }
    let userId = null;
    const productsInCart: OrderItem[] = [];
    let order: Order;
    return this.loginService.User.pipe(
      take(1),
      tap((user: any) => {
        userId = user.Id;
        this.shoppingCartService.ShoppingCart.subscribe(cart => {
          cart.productSet.forEach(value => {
            productsInCart.push(new OrderItem(value.product.id, value.quantity));
          });
          order = new Order(
            user.id,
            productsInCart,
            address,
            cart.TotalSumm
          );
        });
      }),
      switchMap(() => {
        return this.http.post<number>(this.url, order);
      })

    );
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url);
  }

  getById(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.url.concat('/user/').concat(userId.toString()));
  }

  getByOrderId(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url.concat(`/${orderId}`));
  }

  getShippingDetails(orderId: number): Observable<ShippingAddress> {
    return this.http.get<ShippingAddress>(this.url.concat(`/shipping/${orderId}`));
  }


}
