import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public email: string;
  public password: string;
  public repassword: string;

  constructor(
    // public authService: AuthService,
    // public flashMessage: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitRegister() {

  }

}
