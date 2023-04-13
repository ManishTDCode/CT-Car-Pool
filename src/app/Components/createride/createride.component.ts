import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyService } from 'src/app/Services/alertService/alertify.service';
import { AllserviceService } from 'src/app/Services/apiCallService/allservice.service';
import { SharedDataService } from 'src/app/Services/shared/shared-data.service';

@Component({
  selector: 'app-createride',
  templateUrl: './createride.component.html',
  styleUrls: ['./createride.component.css']
})
export class CreaterideComponent implements OnInit {

  newRide!: FormGroup;
  submitted = false;
  carTypeList = [];

  constructor(
    private fb: FormBuilder,
    private service: AllserviceService,
    private alertService: AlertifyService,
    private sharedDataService: SharedDataService,
    private dialog: MatDialog
  ) { }

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

  }

  vehicleType(e: any) {
    this.carTypeList = [];
    if (e.value === "Bike") {
      this.carTypeList.push('Bike (1)');
    }
    else {
      this.carTypeList.push('Hatchback (4)', 'Sedan (5)', 'SUV (7)');
    }
  }

  get f() { return this.newRide.controls; }


  Submit() {
    this.submitted = true;
    if (this.newRide.invalid) {
      return;
    }
    else {
      let reqObj = {
        name: this.sharedDataService.userDetails[0].name,
        mobileNo: this.sharedDataService.userDetails[0].mobileNumber,
        emailId: this.sharedDataService.userDetails[0].emailId,
        ridetype: this.newRide.get('ridetype').value,
        vehiclenumber: this.newRide.get('vehiclenumber').value,
        vehiclecolor: this.newRide.get('vehiclecolor').value,
        vehicletype: this.newRide.get('vehicletype').value,
        from: this.newRide.get('from').value,
        to: this.newRide.get('to').value,
        fare: this.newRide.get('fare').value,
        seats: this.newRide.get('seats').value

      }
      console.log("reqObj", reqObj);

      this.service.createRide(reqObj).subscribe((res: any) => {
        if (res.status == true) {
          this.sharedDataService.isRideCreated.next(true);
          this.alertService.success('Ride created successfully');
          this.dialog.closeAll();

        }
        else {
          this.alertService.error('something went wrong');
        }
      },
        err => {
          this.alertService.error('service is down');
        }
      )
    }
  }
}
