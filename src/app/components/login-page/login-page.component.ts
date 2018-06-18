import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(
    // public authService: AuthService,
    // public flashMessage: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitLogin() {

  }

}
