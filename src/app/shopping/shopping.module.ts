import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    ShoppingCartComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ShoppingRoutingModule,
    SharedModule,
  ],
  exports: [
    CheckOutComponent,
    MyOrdersComponent,
    ShoppingCartComponent,
  ]
})
export class ShoppingModule { }
