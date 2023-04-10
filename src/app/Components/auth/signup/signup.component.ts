import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AlertifyService } from '../../../Services/alertify.service';
import { SharedDataService } from 'src/app/Services/shared/shared-data.service';

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
    public sharedDataService: SharedDataService) { }

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
    console.log(e);
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

  getOTP() {
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

  Submit() {
    console.log("this.UserAction",this.UserAction);
    
    
      this.sharedDataService.isVehicle = false;
      Auth.confirmSignUp(this.SignUp.get('emailId')?.value, this.SignUp.get('otp')?.value,
      { forceAliasCreation: true }).then(data => {
        console.log(data);
        if(this.UserAction === "Submit"){
        this.alertService.success('User registered successfully');
        this.sharedDataService.isSignIn = true;
        }else{
          this.sharedDataService.isVehicle = true;
        }
      })
      .catch(err => {
        this.alertService.error(err.message);
      });
    
   
  }
}

