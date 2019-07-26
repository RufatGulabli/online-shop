import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { LoginService } from './../services/login.service';
import * as moment from 'moment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: any[];
  orderDetails: any[];
  showDescPanel = false;

  constructor(
    private loginService: LoginService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const user = this.loginService.getCredentials() as any;
    this.orderService.getById(user.id).subscribe(orders => {
      this.orders = orders;
      console.log(orders);
    });
  }

  showDescription(orderID) {
    this.orderService.getByOrderId(orderID).subscribe(orders => {
      this.orderDetails = orders;
      this.showDescPanel = false;
      setTimeout(() => {
        this.showDescPanel = true;
      }, 100);
    });
  }

  getLocalDate(date: string) {
    console.log(date);
    const local = moment.utc(date);
    local.local();
    return local.format('ddd, DD MMM YYYY, HH:mm');
  }


}
