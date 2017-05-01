import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/first';

import { ApiService } from './api/api.service';

declare var $:any;

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript('../assets/js/material-dashboard.js');
    $.getScript('../assets/js/initMenu.js');
  }
}
