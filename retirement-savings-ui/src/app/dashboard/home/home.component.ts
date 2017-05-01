import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { TableData } from '../table/table.model';
import {Summary} from '../../api/model/summary-model';

declare var $: any;

@Component({
    selector: 'app-home',
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
    public chartData: any;
    public wallets: any;
    public summary: Summary;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
      this.apiService.getSummary().first().subscribe(response => this.summary = response);
      this.apiService.getWallets().first().subscribe(response => {
        response.forEach(wallet =>
          this.apiService.getAssetsInWallet(wallet[0]).first().subscribe(
            assetResp => {
              wallet[5] = new TableData();
              wallet[5].labels = ['Nazwa'];
              wallet[5].data = assetResp.map(x => ({name: x[0]}));
            }
          )
        );
        this.wallets = response;
      });
      this.apiService.getAllAssets().first().subscribe(response => this.chartData = response);
    }
}
