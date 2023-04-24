import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AlertifyService } from '../../../Services/alertService/alertify.service';
import { SharedDataService } from 'src/app/Services/shared/shared-data.service';
import { AllserviceService } from 'src/app/Services/apiCallService/allservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignUp!: FormGroup;
  submitted = false;
  UserAction = "Submit"

  constructor(private fb: FormBuilder,
    private router: Router,
    private alertService: AlertifyService,
    public sharedDataService: SharedDataService,
    private service: AllserviceService) { }

  ngOnInit() {
    this.SignUp = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      password: ['', Validators.required],
      mobileNo: ['', Validators.required],
      otp: ['']
    });
  }

  onTickCheckBox(e: any) {
    if (e.checked === true) {
      this.UserAction = "Next"
    } else {
      this.UserAction = "Submit"
    }
    // this.sharedDataService.isVehicle = e.checked;
  }
  onBackClick() {
    this.sharedDataService.isVehicle = false;
  }

  get f() { return this.SignUp.controls; }

  getOTP() {
    this.submitted = true;
    if (this.SignUp.invalid) {
      return;
    }
    else {
      const user = {
        username: this.SignUp.get('emailId')?.value,
        password: this.SignUp.get('password')?.value
      };

      Auth.signUp(user)
        .then(data => {
          console.log(data);
          this.alertService.success('OTP sent successfully');
        })
        .catch(err => {
          this.alertService.error(err.message);
        });
    }

  }

  Submit() {
    this.submitted = true;
    if (this.SignUp.invalid) {
      return;
    }else{
    if (this.UserAction == "Submit") {
      this.sharedDataService.isVehicle = false;
      Auth.confirmSignUp(this.SignUp.get('emailId')?.value, this.SignUp.get('otp')?.value,
        { forceAliasCreation: true }).then(data => {
          console.log(data);
          if (this.UserAction === "Submit") {
            this.alertService.success('User registered successfully');
            let reqObj = {
              "name": this.SignUp.get('name').value,
              "emailId": this.SignUp.get('emailId').value,
              "mobileNumber": this.SignUp.get('mobileNo').value,
              "rideType": "",
              "vehicleNumber": "",
              "vehicleColor": "",
              "carType": ""
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
        })
        .catch(err => {
          this.alertService.error(err.message);
        });
      }
      else {
        this.service.name.next(this.SignUp.get('name').value);
        this.service.emmailId.next(this.SignUp.get('emailId').value);
        this.service.mobileNo.next(this.SignUp.get('mobileNo').value);
        this.service.otp.next(this.SignUp.get('otp').value);
        this.sharedDataService.isVehicle = true;
        this.UserAction = "Submit";
      }
    }
      
  }
}

