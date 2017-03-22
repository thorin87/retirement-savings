import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartSeries } from "./chart.model";
import { Subject } from "rxjs/Subject";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @ViewChild( BaseChartDirective ) chart: BaseChartDirective;

  public chartSubject : Subject<Chart>;

  @Input() set chartData(value: any[]){
    console.log('set chartdata', value);
    if(value != null){
      let chartTmp = this.convertApiResultToChartData(value);
      this.chartSubject.next(chartTmp);
    }
  }

  public lineChartData: Array<any>;// = [{data: [1, 2, 5], label: "test"}];
  public lineChartLabels: Array<any>;// = ['a', 'b', 'c'];
  public lineChartType = "line";

  constructor() { 
    console.log('constructor');
    //this.chartTmp = new Chart();
    this.chartSubject = new Subject<Chart>();
  }

  ngOnInit() {
    console.log('oninit');
    this.chartSubject.subscribe(chart => {
      console.log("display", chart);
      this.displayChart(chart);
    });
  }

  displayChart(chrt: Chart){
    //this.lineChartData = chrt.series;
    //this.lineChartLabels = chrt.labels;
    this.lineChartType = "line";
    if (this.chart && this.chart.chart) {
                this.chart.chart.config.data.labels = chrt.labels;
                this.chart.chart.config.data.datasets = chrt.series;
                this.chart.chart.update();
            }
  }

  convertApiResultToChartData(apiResult: any[]) : Chart {
    let result = new Chart();
    result.labels = [];

    let chartSeries = new ChartSeries();
    chartSeries.label = "test";
    chartSeries.data = []
    apiResult.forEach(element => {
      chartSeries.data[chartSeries.data.length] = element[1];
      result.labels[result.labels.length] = element[0];
    });
    result.series = [];
    result.series.push(chartSeries);
    console.log('convertApiResultToChartData', result);
    //debugger;
    return result;
  }

}
