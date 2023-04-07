import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators,FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isVehicle = false;
   constructor() { }


   onTickCheckBox(e:any){
    console.log(e);
    this.isVehicle = e.checked;
   }
   onBackClick(){
    this.isVehicle = false;
   }
}

