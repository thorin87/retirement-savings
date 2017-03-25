import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';

import { ApiService } from './api.service';

import { ChartModule } from 'angular2-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule.forRoot(require('highcharts/highstock'))
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
