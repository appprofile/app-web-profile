import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public isLogged: boolean;

  constructor() { }

  ngOnInit() {
    this.isLogged = false;
  }

}
