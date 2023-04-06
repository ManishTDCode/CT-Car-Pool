import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators,FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  registerForm!: FormGroup ;
  fieldRequired: string = "This field is required"
   constructor() { }
   isSignIn = true;
   

   onSignUpclick(){
    this.isSignIn = false;
   }
}
