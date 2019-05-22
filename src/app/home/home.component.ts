import { Product } from "./../model/product";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  products: Product[];

  constructor(private productService: ProductService) {
    this.productService.getAll("", "", 10).subscribe(result => {
      console.log(result);
      this.products = result;
    });
  }
}
