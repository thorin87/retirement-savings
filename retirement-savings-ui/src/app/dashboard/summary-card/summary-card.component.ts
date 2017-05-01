import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.css']
})
export class SummaryCardComponent implements OnInit {

  @Input() color: string;
  @Input() icon: string;
  @Input() title: string;
  @Input() statIcon: string;
  @Input() statText: string;

  constructor() { }

  ngOnInit() {
  }

}
