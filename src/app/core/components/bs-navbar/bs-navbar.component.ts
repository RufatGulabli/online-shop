import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginService } from '../../../services/login.service';
import { ShoppingCartService } from '../../../services/shopping-card.service';
import { User } from '../../../shared/model/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  user: User;
  count: number;
  private subscription = new Subscription();

  constructor(
    public loginService: LoginService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.shoppingCartService.ShoppingCart.subscribe(card => {
        if (!card) {
          return;
        }
        this.count = card.total;
      }));

    this.subscription.add(
      this.loginService.User.subscribe((user: any) => {
        if (user) {
          this.user = new User(
            user.id,
            user.email,
            user.fullname,
            user.isAdmin
          );
        }
      }));
  }

  logOut() {
    this.subscription.add(
      this.loginService.logOut().subscribe(() => {
        this.router.navigate(['/']);
      }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
