import { ProductService } from "src/app/services/product.service";
import { CategoryService } from "./services/category.service";
import { AdminGuard } from "./services/admin.guard";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { RoutingsComponent, AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminOrdersComponent } from "./admin-components/admin-orders/admin-orders.component";
import { LoginComponent } from "./login/login.component";
import { ProductsComponent } from "./products/products.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { LoginService } from "./services/login.service";
import { AuthGuard } from "./services/auth.guard";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./services/token-interceptor.service";
import { JwtModule } from "@auth0/angular-jwt";
import { NoAccessComponent } from "./no-access/no-access.component";
import { ProductFormComponent } from "./admin-components/product-form/product-form.component";
import { CustomFormsModule } from "ng2-validation";
import { MaterialComponentsModule } from "./material-components.module";
import { ProductTableComponent } from "./admin-components/product-table/product-table.component";
import { DeleteProductDialogComponent } from "./admin-components/product-table/delete-product-dialog/delete-product-dialog.component";
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingsComponent,
    PageNotFoundComponent,
    ShoppingCartComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductsComponent,
    MyOrdersComponent,
    NoAccessComponent,
    ProductFormComponent,
    ProductTableComponent,
    DeleteProductDialogComponent,
    ProductCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule,
    HttpClientModule,
    CustomFormsModule,
  ],
  providers: [
    LoginService,
    CategoryService,
    ProductService,
    AuthGuard,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
  entryComponents: [DeleteProductDialogComponent]
})
export class AppModule { }
