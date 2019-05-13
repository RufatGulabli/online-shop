import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/model/product";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit {
  private tableHeader: string[] = ["Title", "Price", "Category", " "];
  private products: Product[] = [
    new Product(
      "Samsung Galaxy S10+",
      1299.0,
      4,
      "https://upload.wikimedia.org/wikipedia/commons/5/58/Galaxy_S10.jpg"
    ),
    new Product(
      "Panerai Watches",
      956.99,
      2,
      "https://cdn12.picryl.com/photo/2016/12/31/panerai-watches-clock-luxury-watches-75214a-1024.jpg"
    )
  ];
  constructor() {}

  ngOnInit() {}
}
