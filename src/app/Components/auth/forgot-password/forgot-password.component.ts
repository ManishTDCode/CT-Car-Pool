import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AlertifyService } from '../../../Services/alertService/alertify.service';
import { SharedDataService } from 'src/app/Services/shared/shared-data.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotPassword!: FormGroup;
  submitted = false;
  constructor (private fb: FormBuilder, private alertservice: AlertifyService,
  private router: Router, public sharedDataService: SharedDataService) {

  }
  ngOnInit() {
    this.ForgotPassword = this.fb.group({
      username: ['', Validators.required],
      otp: [''],
      newPassword: ['']
    });
  }

  get f() { return this.ForgotPassword.controls; }

  getOTP () {
    this.submitted = true;
    if (this.ForgotPassword.invalid) {
      return;
    } 
    else {
      Auth.forgotPassword(this.ForgotPassword.get('username').value).then((value:any) => {
        this.alertservice.success('OTP sent successfully');
        console.log(value);
      }).catch((err:any) => {
        this.alertservice.error(err.message);
        console.log(err);
      })
    }
  }

  Submit() {
    Auth.forgotPasswordSubmit(this.ForgotPassword.get('username').value,this.ForgotPassword.get('otp').value.toString(),this.ForgotPassword.get('newPassword').value).
    then((value: any) => {
      console.log(value);
      this.alertservice.success('password reseted successfully');
    }).catch((err: any) => {
      this.alertservice.error(err.message);
    })
  }
}
