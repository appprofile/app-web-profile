import { Component, OnInit } from '@angular/core';
/* Services. */
import { Auth0Service } from '@services/auth0/auth0.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string;
  public isLogged: boolean;

  constructor(public auth0Service: Auth0Service) {
    // Load auth0 service.
    auth0Service.handleAuthentication();
    // Schedule renewal.
    auth0Service.scheduleRenewal();
  }

  ngOnInit() {
    this.title = 'app';
    this.isLogged = false;
  }

}
