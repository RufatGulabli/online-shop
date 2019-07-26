import { Product } from './product';

export class ShoppingCart {

  constructor(
    public productSet: Map<number, ShoppingCartItem>,
    public total: number,
    private id?: number,
  ) { }

  get Id() {
    return this.id;
  }

  get TotalSumm() {
    let total = 0;
    this.productSet.forEach(value => {
      total += value.product.price * value.quantity;
    });
    return total;
  }
}

export class ShoppingCartItem {

  constructor(
    public product: Product,
    public quantity: number
  ) { }

}
