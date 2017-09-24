import {Component, Input, OnInit} from '@angular/core';
import {BackgroundColors} from "../../shared/model/data-background-color.enum";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  subtitle: string;

  @Input()
  backgroundColor: BackgroundColors;

  public BackgroundColors = BackgroundColors;

  constructor() { }

  ngOnInit() {

  }

}
