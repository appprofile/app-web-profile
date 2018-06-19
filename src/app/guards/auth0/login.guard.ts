import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth0Service } from '@services/auth0/auth0.service';

@Injectable()
export class LoginGuard implements CanActivate {

 constructor(public auth0Service: Auth0Service, public router: Router) {}

 canActivate(): boolean {
  if (!this.auth0Service.isAuthenticated()) {
   this.router.navigate(['/home']);
   return false;
  }
  return true;
 }

}