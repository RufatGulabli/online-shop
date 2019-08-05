import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { AuthGuard } from '../services/auth.guard';
import { AdminGuard } from '../services/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'product/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'products',
    component: ProductTableComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
