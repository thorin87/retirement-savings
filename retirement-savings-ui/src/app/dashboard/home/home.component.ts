import { Component, OnInit, trigger, state, style, transition, animate, Input } from '@angular/core';
//import initDemo = require('../../../assets/js/charts.js');
import { ApiService } from "../../api.service";
import { TableData } from "../table/table.model";

declare var $:any;

@Component({
    selector: 'home-cmp',
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
    public dataFromApi: any;
    ikeData: TableData;
    ikzeData: TableData;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
      this.apiService.getAllAssets().first().subscribe(response => this.dataFromApi = response);

      let labels = ["Nazwa"];

      this.ikeData = new TableData();
      this.ikeData.labels = labels;
      this.ikeData.data = [
        {"name": "NN (L) Stabilny Globalnej Alokacji"},
        {"name": "NN Gotówkowy"},
        {"name": "NN (L) Globalny Spółek Dywidendowych"}
      ];

      this.ikzeData = new TableData();
      this.ikzeData.labels = labels;
      this.ikzeData.data = [{"name": "DFE PZU"}];
    }
}
