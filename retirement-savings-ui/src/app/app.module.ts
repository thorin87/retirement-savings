import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ApiService } from './api/api.service';

import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import {WelcomeMessageComponent} from "./dashboard/welcome-message/welcome-message.component";
import {CardComponent} from "./dashboard/card/card.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WelcomeMessageComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    // RouterModule.forRoot([]),
    FormsModule,
    HttpModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
