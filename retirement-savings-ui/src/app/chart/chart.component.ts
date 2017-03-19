import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartSeries } from "./chart.model";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() set chartData(value: any[]){
    if(value != null){
      let chart: Chart = this.convertApiResultToChartData(value);
      this.lineChartData = chart.series;
      this.lineChartLabels = chart.labels;
    }
  }

  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

public lineChartType = "line";

  constructor() { }

  ngOnInit() {
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
    debugger;
    return result;
  }

}
