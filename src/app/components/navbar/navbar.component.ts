import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public username: string;
  public useremail: string;
  public userPicture: string;

  @Input('logged') isLogged: boolean;

  constructor() { }

  ngOnInit() {
  }

}
