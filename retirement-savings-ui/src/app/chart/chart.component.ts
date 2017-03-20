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

  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
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
