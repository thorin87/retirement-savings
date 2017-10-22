import { Component, Input } from '@angular/core';
import { ChartSeries } from './chart.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {

  options: Object;

  @Input() set chartData(value: any[]){
    // console.log('set chartdata', value);
    if (value != null){
      // let chartTmp = this.convertApiResultToChartData(value);
      // debugger;
      const chartTmp = this.convertApiResultToCharSeries(value);
      this.displayChart(chartTmp);
      // this.chartSubject.next(chartTmp);
    }
  }

  displayChart(chartSeries: ChartSeries) {
        let options = {
            title : { text : 'Wartość Twoich inwestycji' },
            series: [chartSeries],
            xAxis: {
              type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Wartość'
                }
            }
        };
        let theme = this.loadChartTheme();
        this.options = options;
        // this.options = Object.assign(options, theme);
        // console.log(this.options);
  }

  convertApiResultToCharSeries(apiResult: any[]): ChartSeries {
    const chartSeries = new ChartSeries();
    chartSeries.name = 'Wszystkie portfele';
    chartSeries.data = apiResult.map(element => {
      const date = Date.parse(element.Date);
      const value = +element.Value;
      return [date, value];
    });
    return chartSeries;
  }

  private loadChartTheme() {
    return {
      colors: ['#DDDF0D', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
        '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        backgroundColor: {
          linearGradient: [0, 0, 250, 500],
          stops: [
            [0, 'rgb(48, 96, 48)'],
            [1, 'rgb(0, 0, 0)']
          ]
        },
        borderColor: '#000000',
        borderWidth: 2,
        className: 'dark-container',
        plotBackgroundColor: 'rgba(255, 255, 255, .1)',
        plotBorderColor: '#CCCCCC',
        plotBorderWidth: 1
      },
      title: {
        style: {
          color: '#C0C0C0',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      subtitle: {
        style: {
          color: '#666666',
          font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      xAxis: {
        gridLineColor: '#333333',
        gridLineWidth: 1,
        labels: {
          style: {
            color: '#A0A0A0'
          }
        },
        lineColor: '#A0A0A0',
        tickColor: '#A0A0A0',
        title: {
          style: {
            color: '#CCC',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

          }
        }
      },
      yAxis: {
        gridLineColor: '#333333',
        labels: {
          style: {
            color: '#A0A0A0'
          }
        },
        lineColor: '#A0A0A0',
        minorTickInterval: null,
        tickColor: '#A0A0A0',
        tickWidth: 1,
        title: {
          style: {
            color: '#CCC',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        style: {
          color: '#F0F0F0'
        }
      },
      toolbar: {
        itemStyle: {
          color: 'silver'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            color: '#CCC'
          },
          marker: {
            lineColor: '#333'
          }
        },
        spline: {
          marker: {
            lineColor: '#333'
          }
        },
        scatter: {
          marker: {
            lineColor: '#333'
          }
        },
        candlestick: {
          lineColor: 'white'
        }
      },
      legend: {
        itemStyle: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
          color: '#A0A0A0'
        },
        itemHoverStyle: {
          color: '#FFF'
        },
        itemHiddenStyle: {
          color: '#444'
        }
      },
      credits: {
        style: {
          color: '#666'
        }
      },
      labels: {
        style: {
          color: '#CCC'
        }
      },


      navigation: {
        buttonOptions: {
          symbolStroke: '#DDDDDD',
          hoverSymbolStroke: '#FFFFFF',
          theme: {
            fill: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0.4, '#606060'],
                [0.6, '#333333']
              ]
            },
            stroke: '#000000'
          }
        }
      },

      // scroll charts
      rangeSelector: {
        buttonTheme: {
          fill: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0.4, '#888'],
              [0.6, '#555']
            ]
          },
          stroke: '#000000',
          style: {
            color: '#CCC',
            fontWeight: 'bold'
          },
          states: {
            hover: {
              fill: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0.4, '#BBB'],
                  [0.6, '#888']
                ]
              },
              stroke: '#000000',
              style: {
                color: 'white'
              }
            },
            select: {
              fill: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                  [0.1, '#000'],
                  [0.3, '#333']
                ]
              },
              stroke: '#000000',
              style: {
                color: 'yellow'
              }
            }
          }
        },
        inputStyle: {
          backgroundColor: '#333',
          color: 'silver'
        },
        labelStyle: {
          color: 'silver'
        }
      },

      navigator: {
        handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(16, 16, 16, 0.5)',
        series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
        }
      },

      scrollbar: {
        barBackgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0.4, '#888'],
            [0.6, '#555']
          ]
        },
        barBorderColor: '#CCC',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0.4, '#888'],
            [0.6, '#555']
          ]
        },
        buttonBorderColor: '#CCC',
        rifleColor: '#FFF',
        trackBackgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#000'],
            [1, '#333']
          ]
        },
        trackBorderColor: '#666'
      },

      // special colors for some of the
      legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
      background2: 'rgb(35, 35, 70)',
      dataLabelsColor: '#444',
      textColor: '#C0C0C0',
      maskColor: 'rgba(255,255,255,0.3)'
    };
  }

  public static loadChartPlLang() {
    return {
      loading: 'Ładowanie...',
      months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
      weekdays: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
      shortMonths: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź','Lis', 'Gru'],
      exportButtonTitle: "Export",
      printButtonTitle: "Drukowanie",
      rangeSelectorFrom: "Od",
      rangeSelectorTo: "Do",
      rangeSelectorZoom: "Przybliżenie",
      downloadPNG: 'Pobierz obraz PNG',
      downloadJPEG: 'Pobierz obraz JPEG',
      downloadPDF: 'Pobierz dokument PDF',
      downloadSVG: 'Pobierz obraz SVG',
      thousandsSep: " ",
      decimalPoint: ','
    // resetZoom: "Reset",
    // resetZoomTitle: "Reset,
    }
  }
}
