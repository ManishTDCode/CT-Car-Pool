import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewrideComponent } from '../viewride/viewride.component';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertService/alertify.service';
import { AllserviceService } from 'src/app/Services/apiCallService/allservice.service';
import { SharedDataService } from 'src/app/Services/shared/shared-data.service';

@Component({
  selector: 'app-cancel-ride',
  templateUrl: './cancel-ride.component.html',
  styleUrls: ['./cancel-ride.component.css']
})
export class CancelRideComponent implements OnInit, AfterViewInit {
  public loading = false;
  isListEmpty = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  dataSource = new MatTableDataSource<any>()

  displayedColumns: string[] = ["RequestedTo", "From", "To", "Time", "RideStatus", "Cancel"]
  userEmail: any;

  constructor(private dialog: MatDialog,
    private router: Router,
    private alertService: AlertifyService,
    private allserviceService: AllserviceService,
    private sharedDataService: SharedDataService) {
  }
  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail');
    this.getRequestedRides();
    this.sharedDataService.cancelRide.subscribe((data: any) => {
      console.log("updating cancel ride list");
      if (data) {
        this.getRequestedRides();
      }
    });
  }

  getRequestedRides() {
    this.loading = true;
    this.allserviceService.getRequestRide().subscribe((data: any) => {

      const result = data.data.filter(res => res.requestedFrom === this.userEmail);
      if (result.length > 0) {
        this.isListEmpty = true;
      } else {
        this.isListEmpty = false;
      }
      this.dataSource.data = result;
      this.loading = false;

    })
  }

  cancelRide(data: any) {
    this.loading = true;
    let reqObj = {
      emailType: 'cancelRideRequest',
      emailID: data.requestedTo,
      name: this.sharedDataService.userDetails[0].name
    }
    this.allserviceService.getDashboardRidesList().subscribe((res: any) => {

    })
    this.allserviceService.requestRide(reqObj).subscribe(async (res: any) => {
      if (res.status == true) {
        this.alertService.success("Your cancel request has been sent successfully");
        if (data.isAccepted == true) {
          this.allserviceService.getDashboardRidesList().subscribe(async (res: any) => {
            if (res.status == true) {
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].emailId == data.requestedTo) {
                  let reqObj = {
                    seats: res.data[i].seats + 1
                  }
                  //updating seats
                  await this.allserviceService.updateSeats(res.data[i]._id, reqObj).subscribe();

                }
              }
            }
          });
        }

        // deleting record
        await this.allserviceService.deleteRequestRide(data._id).subscribe();
        this.sharedDataService.cancelRide.next(true);
        this.loading = false;

      }
      else {
        this.loading = false;
        this.alertService.error('something went wrong');
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log("this.paginator", this.paginator);
  }

}
