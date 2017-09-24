import { Component, OnInit } from '@angular/core';
import {BackgroundColors} from "../../shared/model/data-background-color.enum";

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.css']
})
export class WelcomeMessageComponent implements OnInit {

  public BackgroundColors = BackgroundColors;

  constructor() { }

  ngOnInit() {
  }

}
