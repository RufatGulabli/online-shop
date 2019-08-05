import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/shared/model/order';
import * as moment from 'moment';

import { OrderService } from 'src/app/services/order.service';
import { ShippingAddress } from '../../shared/model/shipping-address';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  orderItems: Order[] = [];
  togglePriceSort = false;
  toggleDateSort = false;
  selectedOrderId: number;
  shippingDetails: ShippingAddress;

  private subscription = new Subscription();

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.subscription.add(this.orderService.getAll().subscribe(orders => {
      if (!orders) {
        return;
      }
      orders.forEach(ord => {
        ord.created_on = moment.utc(ord.created_on).toDate().toLocaleString();
      });
      this.orders = orders;
    }));
  }

  sort(column: string) {
    switch (column) {
      case 'date': {
        if (this.toggleDateSort) {
          this.orders.sort((a, b) => (new Date(a.created_on) > new Date(b.created_on) ? 1 : -1));
        } else {
          this.orders.sort((a, b) => (new Date(a.created_on) > new Date(b.created_on) ? -1 : 1));
        }
        this.toggleDateSort = !this.toggleDateSort;

        break;
      }
      case 'price': {
        if (this.togglePriceSort) {
          this.orders.sort((a, b) => a.total_price > b.total_price ? 1 : -1);
        } else {
          this.orders.sort((a, b) => a.total_price > b.total_price ? -1 : 1);
        }
        this.togglePriceSort = !this.togglePriceSort;
        break;
      }
    }
  }

  getShippingAddress(id: number) {
    this.subscription.add(
      this.orderService.getShippingDetails(id).subscribe(result => {
        this.shippingDetails = result;
      }));
  }

  show(orderID: number) {
    this.selectedOrderId = orderID;
    this.subscription.add(
      this.orderService.getByOrderId(orderID).subscribe(order => {
        this.orderItems = order;
      }));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
