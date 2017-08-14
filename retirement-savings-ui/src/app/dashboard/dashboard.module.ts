import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartComponent } from '../chart/chart.component';
import { CommonModule } from "@angular/common";
import { SummaryCardComponent } from './summary-card/summary-card.component';
import {HomeComponent} from "./home/home.component";
import {SpinnerComponent} from "../shared/spinner/spinner.component";

export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  return hc;
}

@NgModule({
    imports: [
        CommonModule,
        // RouterModule.forChild(MODULE_ROUTES),
        ChartModule
    ],
    declarations: [
        ChartComponent,
        MODULE_COMPONENTS,
        SummaryCardComponent,
        SpinnerComponent
    ],
    providers: [
      {
        provide: HighchartsStatic,
        useFactory: highchartsFactory
      }
    ],
    exports: [
      HomeComponent
    ]
})

export class DashboardModule{}
