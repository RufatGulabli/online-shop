import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ControlContainer, NgControl, NgForm } from '@angular/forms';
import { Product } from '../model/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers: [NgForm],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class ProductCardComponent implements OnInit {

  @Input("product") product: Product;  // this is for home page card rendering
  @Input("fg") productForm: FormGroup; //this is for updating and creating new card

  forHomePage: boolean;
  forAdminsPage: boolean;

  constructor(private controlContainer: ControlContainer) {
    this.productForm = this.controlContainer.control as FormGroup;
  }

  ngOnInit(): void {
    if (this.product) {
      this.forHomePage = true;
      this.forAdminsPage = false;
    } else {
      this.forHomePage = false;
      this.forAdminsPage = true;
    }
  }

}
