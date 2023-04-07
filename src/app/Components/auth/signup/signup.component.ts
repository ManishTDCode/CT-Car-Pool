import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators,FormGroupDirective, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AlertifyService } from '../../../Services/alertify.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignUp!: FormGroup;
  submitted = false;
   constructor(private fb: FormBuilder, private router: Router, private alertService: AlertifyService) { }

   ngOnInit() {
    this.SignUp = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      password: ['', Validators.required],
      mobileNo: ['', Validators.required],
      otp: ['']
    });
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
  Auth.confirmSignUp(this.SignUp.get('emailId')?.value, this.SignUp.get('otp')?.value, 
    {forceAliasCreation: true}).then(data => {
          console.log(data);
          this.alertService.success('User registered successfully');
          setTimeout(()=>{
            window.location.reload();
        }, 2000);
       })
       .catch(err => {
        this.alertService.error(err.message);
      });
}
}
