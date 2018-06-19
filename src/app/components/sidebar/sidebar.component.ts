import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userEmail: string;
  userImg: string;

  constructor(public router: Router) { }

  ngOnInit() {
    // Setup admin.
    this.userEmail = localStorage.getItem('email');
    this.userImg = localStorage.getItem('picture');
  }

}
