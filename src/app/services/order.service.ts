import { Injectable } from '@angular/core';
import { Order } from '../model/order';
import { ShippingAddress } from './../model/shipping-address';
import { LoginService } from './login.service';
import { User } from '../model/user';
import { OrderItem } from '../model/order-item';
import { ShoppingCartService } from './shopping-card.service';
import { ShoppingCart } from './../model/shopping-card';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
      return;
    }
    const user = this.loginService.getCredentials() as any;
    const productsInCart: OrderItem[] = [];
    let order: Order;
    this.shoppingCartService.ShoppingCart.subscribe(card => {
      card.productSet.forEach(value => {
        productsInCart.push(new OrderItem(value.product.id, value.quantity));
      });
      order = new Order(
        user.id,
        productsInCart,
        address,
        card.TotalSumm
      );
    });
    return this.http.post<number>(this.url, order);
  }

  getById(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.url.concat('/user/').concat(userId.toString()));
  }

  getByOrderId(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(this.url.concat(`/${orderId}`));
  }









}
