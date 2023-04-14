import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/Services/alertService/alertify.service';
import { AllserviceService } from 'src/app/Services/apiCallService/allservice.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-ride',
  templateUrl: './request-ride.component.html',
  styleUrls: ['./request-ride.component.css']
})
export class RequestRideComponent implements OnInit {

  requestRide!: FormGroup;
  submitted = false;
  public loading = false;
  requestRideDetails: any;

  constructor(private fb: FormBuilder,
    private service: AllserviceService,
    private alertService: AlertifyService, private dialog: MatDialog) {

  }



  ngOnInit(): void {
    this.requestRide = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  get f() { return this.requestRide.controls; }

  Submit() {
    this.submitted = true;
    if (this.requestRide.invalid) {
      return;
    }
    else {
      this.loading = true;
      const reqObj = {
        emailID: this.requestRideDetails.emailId,
        mobileNo: this.requestRideDetails.mobileNo,
        name: this.requestRideDetails.name,
        from: this.requestRide.get('from').value,
        to: this.requestRide.get('to').value,
        time: this.requestRide.get('time').value
      }
      this.service.requestRide(reqObj).subscribe((res: any) => {
        if (res.status == true) {
          this.loading = false;
          this.alertService.success(res.message);
          this.dialog.closeAll();
        }
        else {
          this.loading = false;
          this.alertService.error(res.message);
        }
      },
        err => {
          this.loading = false;
          this.alertService.error("soemthing went wrong");
        }
      );
    }
  }

}
