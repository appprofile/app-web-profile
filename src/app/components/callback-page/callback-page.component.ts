import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.scss']
})
export class CallbackPageComponent implements OnInit {

  constructor(public router: Router) {
    // It is a good practice have a callback component in Auth0 integration.
  }

  ngOnInit() {
  }

}
