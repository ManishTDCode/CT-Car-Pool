import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-createride',
  templateUrl: './createride.component.html',
  styleUrls: ['./createride.component.css']
})
export class CreaterideComponent implements OnInit{
 
  newRide!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.newRide = this.fb.group({
      ridetype: ['', Validators.required],
      vehiclenumber: ['', Validators.required],
      vehiclecolor: ['', Validators.required],
      vehicletype: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      fare: ['', Validators.required],
      seats: ['', Validators.required],
    });
    console.log("CreaterideComponent");
    
    
  }
  Submit(){}
}
