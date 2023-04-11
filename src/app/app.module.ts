import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreaterideComponent } from './Components/createride/createride.component';
import { ViewrideComponent } from './Components/viewride/viewride.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoadingModule } from "ngx-loading";
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreaterideComponent,
    ViewrideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
