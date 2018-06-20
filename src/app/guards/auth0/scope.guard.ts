import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Auth0Service } from '@services/auth0/auth0.service';

@Injectable()
export class ScopeGuard implements CanActivate {

  constructor(public auth0Service: Auth0Service, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const scopes = (route.data as any).expectedScopes;
    if (!this.auth0Service.isAuthenticated() || !this.auth0Service.userHasScopes(scopes)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
