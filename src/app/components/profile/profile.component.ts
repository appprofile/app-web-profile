import { Component, OnInit } from '@angular/core';
import { UserData } from '../../../models/user-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: UserData;

  constructor() { }

  ngOnInit() {
    this.user = new UserData();
  }

  onClickRegisterUserData(user: UserData) {

  }

}
