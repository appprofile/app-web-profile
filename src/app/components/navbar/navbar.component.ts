import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLogin: boolean;
  public username: string;
  public useremail: string;
  public userPicture: string;

  constructor() { }

  ngOnInit() {
    this.isLogin = false;
  }

}
