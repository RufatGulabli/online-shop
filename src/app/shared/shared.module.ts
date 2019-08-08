import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductCardComponent } from './product-card/product-card.component';
import { MaterialComponentsModule } from './../material-components.module';
import { AlertComponent } from './alert/alert.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ProductCardComponent,
    NoAccessComponent,
    PageNotFoundComponent,
    AlertComponent,
    FooterComponent
  ],
  imports: [
    MaterialComponentsModule,
    CommonModule,
    NgbModule,
  ],
  exports: [
    ProductCardComponent,
    NoAccessComponent,
    PageNotFoundComponent,
    FooterComponent,
    CommonModule,
    MaterialComponentsModule,
    NgbModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
