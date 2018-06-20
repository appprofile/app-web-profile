import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Rx';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from '@environments/environment';

@Injectable()
export class Auth0Service {

  /** Application web auths. There will be one for each api to which we connect. */
  webAuth = new auth0.WebAuth({
    clientID: environment.auth0.clientid,
    domain: environment.auth0.domain,
    responseType: 'token id_token',
    audience: environment.auth0.audience,
    redirectUri: `http://${environment.publichost}/${environment.auth0.callback}`,
    scope: environment.auth0.scope
  });

  // Refresh subscription property.
  refreshSub: any;

  constructor(public router: Router) { }

  public login(): void {
    this.webAuth.authorize();
  }

  public handleAuthentication(): void {
    this.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        /*console.log(authResult);*/
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/profile']);
      } else if (err) {
        const errCode = ':lock: 401';
        this.router.navigate(['/error'], { queryParams: { errorCode: errCode, errorMessage: err.errorDescription } });
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Setup email and user_id.
    localStorage.setItem('email', authResult.idTokenPayload.email);
    localStorage.setItem('user_id', authResult.idTokenPayload.sub);
    localStorage.setItem('picture', authResult.idTokenPayload.picture);

    // Setup scopes.
    const scopes = authResult.scope || environment.auth0.scope || '';
    localStorage.setItem('scopes', JSON.stringify(scopes));

    // Set the time that the Access Token will expire at
    const expiresIn = (authResult.expiresIn * 1000) + new Date().getTime();
    const expiresAt = JSON.stringify(expiresIn);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);

    // Schedule renewal.
    this.scheduleRenewal();
  }

  public logout(): void {
    // Clean local storage.
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('picture');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');

    // Unschedule renewal.
    this.unscheduleRenewal();

    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time.
    const expiresAtValue: string = localStorage.getItem('expires_at');
    let expiresAt = new Date().getTime();
    if (expiresAtValue && expiresAtValue.length > 0) {
      expiresAt = JSON.parse(expiresAtValue);
    }
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  public renewToken() {
    this.webAuth.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const expiresIn$ = Observable.of(expiresAt).pipe(
      mergeMap(expiresAt => {
        const now = Date.now();
        // Use timer to track delay until expiration
        // to run the refresh at the proper time
        return Observable.timer(Math.max(1, expiresAt - now));
      }));
    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSub = expiresIn$.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

}