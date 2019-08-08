import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../shared/model/user';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // const isAdmin = (this.loginService.getCredentials() as any).isAdmin;
    // if (isAdmin) {
    //   return true;
    // }
    // this.router.navigate(['/noaccess']);
    // return false;

    return this.loginService.User.pipe(
      map((user: any) => {
        if (user.isAdmin) {
          return true;
        } else {
          this.router.navigate(['/noaccess']);
          return false;
        }
      },
        catchError(err => of(false))
      ));
  }
}
