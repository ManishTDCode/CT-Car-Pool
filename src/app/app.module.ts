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
import { RequestRideDashboardComponent } from './Components/request-ride-dashboard/request-ride-dashboard.component';
import { MyRidesComponent } from './Components/my-rides/my-rides.component';

import { RideListComponent } from './Components/ride-list/ride-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RideFilterPipe } from './ride-filter.pipe';
import { CancelRideComponent } from './Components/cancel-ride/cancel-ride.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreaterideComponent,
    ViewrideComponent,
    RequestRideComponent,
    RequestRideDashboardComponent,
    MyRidesComponent,
    RideListComponent,
    RideFilterPipe,
    CancelRideComponent
  ],
  imports: [
    BrowserModule,
    
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ReqInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
