import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginService } from './../services/login.service';
import { ShoppingCartService } from './../services/shopping-card.service';
import { User } from '../model/user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  user: User;
  count: number;
  private subscription: Subscription;

  constructor(
    public loginService: LoginService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.subscription = this.shoppingCartService.ShoppingCart.subscribe(card => {
      if (!card) {
        return;
      }
      this.count = card.total;
    });
    let userFromStorage = this.loginService.getCredentials() as any;
    console.log('UserFromStorage: ', userFromStorage);
    if (userFromStorage) {
      userFromStorage = this.loginService.getCredentials() as any;
      this.user = new User(
        userFromStorage.id,
        userFromStorage.email,
        userFromStorage.fullname,
        userFromStorage.isAdmin
      );
    }
    console.log('this.user: ', this.user);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
