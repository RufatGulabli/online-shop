import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialComponentsModule } from "./material-components.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { RoutingsComponent, AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { LoginComponent } from "./login/login.component";
import { ProductsComponent } from "./products/products.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { LoginService } from "./services/login.service";
import { AuthGuard } from "./services/auth-guard.guard";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./services/token-interceptor.service";

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
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
