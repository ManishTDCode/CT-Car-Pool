import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/Services/shared/shared-data.service';
import { AllserviceService } from 'src/app/Services/apiCallService/allservice.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { AlertifyService } from '../../../Services/alertService/alertify.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  CarDetails!: FormGroup;
  submitted = false;
  selectedCarType: any;
  carTypeList = [];
  carType: any;

  constructor(private alertService: AlertifyService, private fb: FormBuilder, public sharedDataService: SharedDataService, private service: AllserviceService) { }

  ngOnInit() {
    this.CarDetails = this.fb.group({
      ridetype: ['', Validators.required],
      vehiclenumber: ['', Validators.required],
      vehiclecolor: ['', Validators.required],
      cartype: ['', Validators.required]
    });
  }

  get f() { return this.CarDetails.controls; }


  onColrSelect(e: any) {
    console.log(e);
  }

  vehicleType(e: any) {
    this.carTypeList = [];
    if (e.value === "Bike") {
      this.carTypeList.push('Bike (1)');
    }
    else {
      this.carTypeList.push('Hatchback (3)', 'Sedan (4)', 'SUV (6)');
    }
  }

  saveData() {
    this.submitted = true;
    if (this.CarDetails.invalid) {
      return;
    }
    else {

      let emailId;
      let name;
      let mobileNo;
      let otp;

      this.service.name.subscribe((value: any) => {
        name = value;
      });
      this.service.emmailId.subscribe((value: any) => {
        emailId = value;
      });
      this.service.mobileNo.subscribe((value: any) => {
        mobileNo = value;
      });
      this.service.otp.subscribe((value: any) => {
        otp = value;
      });
      console.log(emailId);

      Auth.confirmSignUp(emailId, otp,
        { forceAliasCreation: true }).then(data => {
          console.log(data);
          this.alertService.success('User registered successfully');
          let reqObj = {
            "name": name,
            "emailId": emailId,
            "mobileNumber": mobileNo,
            "rideType": this.CarDetails.get('ridetype').value,
            "vehicleNumber": this.CarDetails.get('vehiclenumber').value,
            "vehicleColor": this.CarDetails.get('vehiclecolor').value,
            "carType": this.CarDetails.get('cartype').value
          }

          this.service.signUPDetails(reqObj).subscribe((res: any) => {
            try {
              console.log(res);
            } catch (error: any) {
              this.alertService.error(error);
            }
          }
          )
          this.sharedDataService.isSignIn = true;
        }
        )
        .catch(err => {
          this.alertService.error(err.message);
        });
    }

  }
}
