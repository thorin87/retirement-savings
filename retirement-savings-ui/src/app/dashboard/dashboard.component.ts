import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  welcomeMessageVisible = false;
  userGuid: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userGuid = this.route.snapshot.params['guid'];
    if (this.userGuid === undefined) {
      this.userGuid = null;
    }
    if (this.userGuid === null || this.userGuid.length === 0) {
      this.welcomeMessageVisible = true;
    }
  }
}
