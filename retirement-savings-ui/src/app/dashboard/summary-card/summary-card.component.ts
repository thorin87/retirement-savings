import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.css', '../card/card.component.css']
})
export class SummaryCardComponent implements OnInit {

  @Input() color: string;
  @Input() icon: string;
  @Input() title: string;
  @Input() statIcon: string;
  @Input() statText: string;
  @Input() isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

  isFooterVisible(): boolean {
    return this.statIcon != null && this.statText != null;
  }

}
