import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewride',
  templateUrl: './viewride.component.html',
  styleUrls: ['./viewride.component.css']
})
export class ViewrideComponent implements OnInit{
  rideDetails:any;
  constructor(){}
  ngOnInit(){
   console.log("rideDetails",this.rideDetails);
   
  }

}
