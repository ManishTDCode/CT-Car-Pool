import { Component } from '@angular/core';

@Component({
  selector: 'app-request-ride-dashboard',
  templateUrl: './request-ride-dashboard.component.html',
  styleUrls: ['./request-ride-dashboard.component.css']
})
export class RequestRideDashboardComponent {
  rideDetails =[
    {
      requestedTo: "pallavi",
      requestedFrom: "Manish",
      requestedFromfrom: "airoli",
      requestedFromto: "kalyan",
      requestedFromTime: "05:00PM"
    },
    {
      requestedTo: "pallavi",
      requestedFrom: "Manish",
      requestedFromfrom: "airoli",
      requestedFromto: "kalyan",
      requestedFromTime: "05:00PM"
    },
    {
      requestedTo: "pallavi",
      requestedFrom: "Manish",
      requestedFromfrom: "airoli",
      requestedFromto: "kalyan",
      requestedFromTime: "05:00PM"
    },
   
  ] 
  accept(){
    
  }
  reject(){

  }
}
