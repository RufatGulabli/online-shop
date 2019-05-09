export class Product {
  constructor(
    private title: string,
    private price: number,
    private category: number,
    private imageUrl: string
  ) {}

  get Title() {
    return this.title;
  }

  get Price() {
    return this.price;
  }

  get Category() {
    return this.category;
  }

  get ImageUrl() {
    return this.imageUrl;
  }
}
