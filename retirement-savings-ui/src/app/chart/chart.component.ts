import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartSeries } from "./chart.model";
import { Subject } from "rxjs/Subject";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  @Input() set chartData(value: any[]){
    console.log('set chartdata', value);
    if(value != null){
      //let chartTmp = this.convertApiResultToChartData(value);
      debugger;
      let chartTmp = this.convertApiResultToCharSeries(value);
      this.displayChart(chartTmp);
      //this.chartSubject.next(chartTmp);
    }
  }

  public options: Object;

  displayChart(chrt: ChartSeries){
        this.options = {
            title : { text : 'simple chart' },
            series: [chrt],
            xAxis: {
              type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Wartość'
                }
            }
        };
        console.log(this.options);
  }

  convertApiResultToCharSeries(apiResult: any[]) : ChartSeries {
    let chartSeries = new ChartSeries();
    chartSeries.name = "NN (L) Stabilny Globalnej Alokacji (K)";
    chartSeries.data = apiResult;
    /*
    chartSeries.data = apiResult.map(element => {
      let date = Date.parse(element[0]);
      let value = +element[1];
      return [date, value];
    });
    */
    return chartSeries;
  }

}
