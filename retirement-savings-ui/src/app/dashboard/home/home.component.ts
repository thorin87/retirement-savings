import { Component, OnInit, trigger, state, style, transition, animate, Input } from '@angular/core';
//import initDemo = require('../../../assets/js/charts.js');
import { ApiService } from "../../api.service";

declare var $:any;

@Component({
    selector: 'home-cmp',
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
    public dataFromApi: any;

    constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getTestData().first().subscribe(response => this.dataFromApi = response);
  }
}
