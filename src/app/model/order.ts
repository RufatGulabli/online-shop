import { OrderItem } from './order-item';
import { ShippingAddress } from './shipping-address';

export class Order {

  dateCreated: string;

  constructor(
    public userID: number,
    public orderItems: OrderItem[],
    public shipping: ShippingAddress,
    public totalSumm: number
  ) {
    this.dateCreated = new Date().toISOString();
  }

}
