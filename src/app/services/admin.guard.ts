import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAdmin = (this.loginService.getCredentials() as any).isAdmin;
    if (isAdmin) {
      return true;
    }
    this.router.navigate(['/noaccess']);
    return false;
  }
}
