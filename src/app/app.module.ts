import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialComponentsModule } from "./material-components.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { RoutingsComponent, AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { LoginComponent } from "./login/login.component";
import { ProductsComponent } from "./products/products.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { LoginService } from "./services/login.service";

@NgModule({
  declarations: [
    AppComponent,
    RoutingsComponent,
    PageNotFoundComponent,
    ShoppingCartComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    LoginComponent,
    ProductsComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
