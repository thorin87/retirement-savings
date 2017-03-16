import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/first';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  testData : any[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    
    this.apiService.getTestData().first().subscribe(response => this.testData = response);
  }
}
