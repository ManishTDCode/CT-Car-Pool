import { Component } from '@angular/core';

@Component({
  selector: 'app-viewride',
  templateUrl: './viewride.component.html',
  styleUrls: ['./viewride.component.css']
})
export class ViewrideComponent {
  reideDetails = {
    ridetype:"Car",
    vehiclenumber:"MH4-4444",
    vehiclecolor:"Black",
    vehicletype:"SUV",
    from:"Airoli",
    to:"Thane",
    fare:"15",
    seats:"3",
  }
}
