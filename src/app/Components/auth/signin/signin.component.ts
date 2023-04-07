import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
   constructor() { }
   isSignIn = true;
   isForgotPassword = false;
   
   onSignUpclick(){
    this.isSignIn = false;
    this.isForgotPassword = false;
   }
   onForgotPasswordclick(){
    this.isSignIn = false;
    this.isForgotPassword = true;
   }

}
