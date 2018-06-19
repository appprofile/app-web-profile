import { Component, Input, OnInit } from '@angular/core';
/* Services. */
import { Auth0Service } from '@services/auth0/auth0.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public username: string;
  public useremail: string;
  public userPicture: string;

  @Input() isLogged: boolean;

  constructor(public auth0Service: Auth0Service) { }

  ngOnInit() {
  }

}
