import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { LoginService } from '../../services/login.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders: any[];
  orderDetails: any[];
  showDescPanel = false;
  noData = false;

  private subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.loginService.User.subscribe((user: any) => {
        this.orderService.getById(user.id).subscribe(orders => {
          if (!orders.length) {
            this.noData = true;
          }
          this.orders = orders;
          this.orders.forEach(order => {
            order.created_on = moment(order.created_on).toDate().toLocaleString();
          });
        });
      }));
  }

  showDescription(orderID) {
    this.subscription.add(
      this.orderService.getByOrderId(orderID).subscribe(orders => {
        this.orderDetails = orders;
        this.showDescPanel = false;
        setTimeout(() => {
          this.showDescPanel = true;
        }, 100);
      }));
  }

  getLocalDate(date: string) {
    console.log(date);
    const local = moment.utc(date);
    local.local();
    return local.format('ddd, DD MMM YYYY, HH:mm');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
