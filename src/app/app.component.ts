import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string;
  public isLogged: boolean;

  constructor() { }

  ngOnInit() {
    this.title = 'app';
    this.isLogged = false;
  }

}
