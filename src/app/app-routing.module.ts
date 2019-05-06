import { AdminGuard } from "./services/admin.guard";
import { AuthGuard } from "./services/auth.guard";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { AdminOrdersComponent } from "./admin-components/admin-orders/admin-orders.component";
import { AdminProductsComponent } from "./admin-components/admin-products/admin-products.component";
import { ProductsComponent } from "./products/products.component";
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./login/login.component";
import { NoAccessComponent } from "./no-access/no-access.component";
import { ProductFormComponent } from "./admin-components/product-form/product-form.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "shopping-cart",
    component: ShoppingCartComponent,
    canActivate: [AuthGuard]
  },
  { path: "products", component: ProductsComponent },
  { path: "login", component: LoginComponent },
  { path: "my/orders", component: MyOrdersComponent, canActivate: [AuthGuard] },
  {
    path: "admin/products",
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "admin/orders",
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "admin/product/new",
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  { path: "noaccess", component: NoAccessComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const RoutingsComponent = [HomeComponent, BsNavbarComponent];
