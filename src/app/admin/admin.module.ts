import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { MaterialComponentsModule } from '../material-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DeleteProductDialogComponent } from './product-table/delete-product-dialog/delete-product-dialog.component';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    ProductFormComponent,
    ProductTableComponent,
    DeleteProductDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    AdminRoutingModule
  ],
  entryComponents: [DeleteProductDialogComponent]
})
export class AdminModule { }
