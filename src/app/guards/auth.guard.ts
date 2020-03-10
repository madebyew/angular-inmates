import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router 
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../routes/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.userIsLoggedIn) {
      return true;
    }
    return this.router.navigate(['/'], { relativeTo: this.activatedRoute });
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.userIsLoggedIn) {
      return true;
    }
    return this.router.navigate(['/'], { relativeTo: this.activatedRoute });
  }
}
