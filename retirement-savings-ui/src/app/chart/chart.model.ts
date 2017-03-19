export class Chart {
    public series: ChartSeries[];
    public labels: string[];
    public type: string = 'line';
}

export class ChartSeries{
     public data: Array<number>;
     public label: string;
}
