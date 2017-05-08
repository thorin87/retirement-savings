import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { TableData } from '../table/table.model';
import {Summary} from '../../api/model/summary.model';
import {Wallet} from "../../api/model/wallet.model";

declare var $: any;

@Component({
    selector: 'app-home',
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
    public chartData: any;
    public wallets: Wallet[];
    public summary: Summary;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
      this.apiService.getSummary().first().subscribe(response => this.summary = response);
      this.apiService.getWallets().first().subscribe(response => {
        response.forEach(wallet =>
          this.apiService.getAssetsInWallet(wallet.Id).first().subscribe(
            assetResp => {
              wallet.Assets = new TableData();
              wallet.Assets.labels = ['Nazwa'];
              wallet.Assets.data = assetResp.map(x => ({name: x.FundName}));
            }
          )
        );
        this.wallets = response;
      });
      this.apiService.getAllAssets().first().subscribe(response => this.chartData = response);
    }
}
