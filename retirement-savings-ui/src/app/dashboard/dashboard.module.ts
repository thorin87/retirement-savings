import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ChartComponent } from '../chart/chart.component';
import { CommonModule } from "@angular/common";

export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  return hc;
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MODULE_ROUTES),
        ChartModule
    ],
    declarations: [
        ChartComponent,
        MODULE_COMPONENTS ],
    providers:[
      {
        provide: HighchartsStatic,
        useFactory: highchartsFactory
      }
    ]
})

export class DashboardModule{}
