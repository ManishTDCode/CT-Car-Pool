import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/Services/shared/shared-data.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {

  selectedCarType:any;
  carTypeList = [];
  carType:any; 

    constructor(public sharedDataService:SharedDataService){}

  onColrSelect(e:any){
    console.log(e);
    
  }
}
