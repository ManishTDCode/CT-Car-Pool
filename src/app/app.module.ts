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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReqInterceptorInterceptor } from './Services/reqInterceptor/req-interceptor.interceptor';
import { RequestRideComponent } from './Components/request-ride/request-ride.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreaterideComponent,
    ViewrideComponent,
    RequestRideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ReqInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
