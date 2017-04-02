import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { ChartModule } from 'angular2-highcharts';
import { ChartComponent } from '../chart/chart.component';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MODULE_ROUTES),
        ChartModule.forRoot(require('highcharts/highstock'))
    ],
    declarations: [ 
        ChartComponent, 
        MODULE_COMPONENTS ]
})

export class DashboardModule{}
