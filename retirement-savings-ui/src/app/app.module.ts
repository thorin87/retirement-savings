import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';

import { ApiService } from './api.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { ChartModule } from 'angular2-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    RouterModule.forRoot([]),
    FormsModule,
    HttpModule,
    ChartModule.forRoot(require('highcharts/highstock'))
  ],
  providers: [
    ApiService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [
    ChartComponent
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
