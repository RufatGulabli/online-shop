import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from './services/category.service';
import { AdminGuard } from './services/admin.guard';
import { AppComponent } from './app.component';
import { RoutingsComponent, AppRoutingModule } from './app-routing.module';
import { LoginService } from './services/login.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptor } from './services/token-interceptor.service';
import { OrderService } from './services/order.service';
import { ShoppingCartService } from './services/shopping-card.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    RoutingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ShoppingModule,
    AppRoutingModule // this must be last element in the list
  ],
  providers: [
    LoginService,
    CategoryService,
    ProductService,
    OrderService,
    ShoppingCartService,
    AuthGuard,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
