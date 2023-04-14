import { Component, OnInit } from '@angular/core';
import { AllserviceService } from 'src/app/Services/apiCallService/allservice.service';
import { SharedDataService } from 'src/app/Services/shared/shared-data.service';
import { AlertifyService } from 'src/app/Services/alertService/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-ride-dashboard',
  templateUrl: './request-ride-dashboard.component.html',
  styleUrls: ['./request-ride-dashboard.component.css']
})
export class RequestRideDashboardComponent implements OnInit {
  rideDetails = [];
  public loading = false;
  constructor(private service: AllserviceService, private sharedService: SharedDataService,
    private alertService: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.service.getRequestRide().subscribe((res: any) => {
      this.rideDetails = [];
      for (let i = 0; i < res.data.length; i++) {
        this.rideDetails.push(res.data[i]);
      }

    })
  }

  async accept(emailTo: any, requestId: any) {
    this.loading = true;
    let reqObj = {
      emailType: 'requestAccept',
      emailID: emailTo,
      name: this.sharedService.userDetails[0].name
    }
    this.service.requestRide(reqObj).subscribe((res: any) => {
      if (res.status == true) {
        this.alertService.success('request accepted successfully');
        this.service.deleteRequestRide(requestId).subscribe(async (res: any) => {
          await this.service.getDashboardRidesList().subscribe((res: any) => {
            if (res.status == true) {
              for (let i = 0; i < res.data.length; i++) {
                for (let j = 0; j < this.rideDetails.length; j++) {
                  if (res.data[i].emailId == this.rideDetails[j].requestedTo) {
                    let reqObj = {
                      name: res.data[i].name,
                      mobileNo: res.data[i].mobileNo,
                      emailId: res.data[i].emailId,
                      ridetype: res.data[i].ridetype,
                      vehiclenumber: res.data[i].vehiclenumber,
                      vehiclecolor: res.data[i].vehiclecolor,
                      vehicletype: res.data[i].vehicletype,
                      from: res.data[i].from,
                      to: res.data[i].to,
                      fare: res.data[i].fare,
                      seats: res.data[i].seats - 1
                    }
                    this.service.updateSeats(res.data[i]._id, reqObj).subscribe((res: any) => {

                    });
                  }
                }
              }
            }
          });
          this.router.navigate(['dashboard']);
        });
        let reqObj = {

        }
        this.service.updateSeats(requestId, reqObj);
        this.loading = false;
      }
      else {
        this.alertService.error('something went wrong');
        this.loading = false;
      }
    });
  }

  reject(emailTo: any, requestId: any) {
    this.loading = true;
    let reqObj = {
      emailType: 'requestReject',
      emailID: emailTo,
      name: this.sharedService.userDetails[0].name,
      mobileNo: this.sharedService.userDetails[0].mobileNo
    }
    this.service.requestRide(reqObj).subscribe((res: any) => {
      if (res.status == true) {
        this.alertService.success('request rejected successfully');
        this.service.deleteRequestRide(requestId).subscribe((res: any) => {
          this.router.navigate(['dashboard']);
        });
        this.loading = false;
      }
      else {
        this.alertService.error('something went wrong');
        this.loading = false;
      }
    });
  }
}
