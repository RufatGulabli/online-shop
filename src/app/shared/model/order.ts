import { OrderItem } from './order-item';
import { ShippingAddress } from './shipping-address';

export class Order {

  created_on: string;

  constructor(
    public userID: number,
    public orderItems: OrderItem[],
    public shipping: ShippingAddress,
    public total_price: number,
    public id?: number,
    public toggleDetail?: boolean
  ) {
    this.created_on = new Date().toISOString();
  }

}
