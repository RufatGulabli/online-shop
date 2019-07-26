import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ShoppingCartService } from './../services/shopping-card.service';
import { ShippingAddress } from '../model/shipping-address';
import { OrderService } from '../services/order.service';
import { ShoppingCart } from '../model/shopping-card';
import { AlertService } from './../services/alert.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  form: FormGroup;
  cart: ShoppingCart;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  get Name() {
    return this.form.get('name');
  }

  get Address() {
    return this.form.get('address1');
  }

  get City() {
    return this.form.get('city');
  }

  ngOnInit() {
    const address = JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('address'));
    if (address) {
      this.form = new FormGroup({
        name: new FormControl(address.name, [Validators.required]),
        address1: new FormControl(address.address1, [Validators.required]),
        address2: new FormControl(address.address2),
        city: new FormControl(address.city, [Validators.required])
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        address1: new FormControl(null, [Validators.required]),
        address2: new FormControl(null),
        city: new FormControl(null, [Validators.required])
      });
    }
    this.shoppingCartService.ShoppingCart.subscribe(cart => {
      if (cart) {
        this.cart = cart;
      }
    });
  }

  onSubmit() {
    const address = new ShippingAddress(
      (this.Name.value as string).trim(),
      (this.Address.value as string).trim(),
      (this.City.value as string).trim(),
      (this.form.get('address2').value as string) ? (this.form.get('address2').value as string).trim() : null
    );
    this.orderService.place(address).subscribe(result => {
      if (!result) {
        this.alertService.showAlert(
          'Something went wrong. Please try again.',
          'error',
          '/shopping-cart'
        );
      }

      this.shoppingCartService.clearCart().subscribe(() => {
        this.alertService.showAlert(
          'Your order was successfulyy submitted. It will be processed immediately. Thanks for your purchase.',
          'success',
          '/my/orders'
        );
      });
    });
  }

}
