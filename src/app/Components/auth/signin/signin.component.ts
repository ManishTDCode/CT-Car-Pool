import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AlertifyService } from '../../../Services/alertify.service';
import { SharedDataService } from 'src/app/Services/shared/shared-data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  Login!: FormGroup;
  submitted = false;
  

  constructor(
    private fb: FormBuilder, 
    private router: Router,
     private alertService: AlertifyService,
     public sharedDataService:SharedDataService
    ) { }
  ngOnInit() {
    this.Login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.Login.controls; }

  login() {
    this.submitted = true;
    if (this.Login.invalid) {
      return;
    }
    else {
      let user = {
        username: this.Login.get('username')?.value,
        password: this.Login.get('password')?.value
      };
      Auth.signIn(user).then(user => {
        console.log(user);
        localStorage.setItem('userEmail', user.attributes.email);
        localStorage.setItem('idToken', user.signInUserSession.accessToken.jwtToken);
        localStorage.setItem("isLoggedIn", "Yes");
        this.alertService.success('user logged in successfully');
      })
        .catch(err => {
          this.alertService.error(err.message);
        });
    }
  }
 

  onSignUpclick() {
    this.sharedDataService.isSignIn = false;
    this.sharedDataService.isForgotPassword = false;
    
  }
  onForgotPasswordclick() {
    this.sharedDataService.isSignIn = false;
    this.sharedDataService.isForgotPassword = true;
  }

}
