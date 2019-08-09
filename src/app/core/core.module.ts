import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './components/signup/signup.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    NgbModule,
    JwtModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ],
  exports: [BsNavbarComponent]
})
export class CoreModule { }
