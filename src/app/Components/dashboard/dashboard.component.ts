import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewrideComponent } from '../viewride/viewride.component';
import { CreaterideComponent } from '../createride/createride.component';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertService/alertify.service';
import { AllserviceService } from 'src/app/Services/apiCallService/allservice.service';
import { SharedDataService } from 'src/app/Services/shared/shared-data.service';
import { RequestRideComponent } from '../request-ride/request-ride.component';
import { takeUntil } from 'rxjs';
import { CancelRideComponent } from '../cancel-ride/cancel-ride.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: any;
  activeLink = 'link';
  test = 0;
  userName: string;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertifyService,
    private allserviceService: AllserviceService,
    private sharedDataService: SharedDataService
  ) { }


  ngOnInit(): void {
    this.userDetails();
  }

  userDetails() {
    this.allserviceService.getUserDetails().subscribe((data: any) => {
      let userEmail = localStorage.getItem('userEmail');
      const userDetails = data.data.filter((x: any) =>
        x.emailId == userEmail
      );
      this.sharedDataService.userDetails = userDetails;
      this.userName = this.sharedDataService.userDetails[0].name;
      console.log(this.sharedDataService.userDetails);


    });
  }

  logOut() {
    this.loading = true;
    Auth.signOut()
      .then(data => {
        this.alertService.success('Logout Successfull');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('idToken');
        this.router.navigate(['/']);
        this.loading = false;
      })
      .catch(err => {
        this.alertService.error(err);
        this.loading = false;
      });
  }
  createRide(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(CreaterideComponent, {
      width: '452px',
      maxWidth: '100%',
      height: "auto",

      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  cancelRide(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(CancelRideComponent, {
      width: '750px',
      maxWidth: '100%',
      height: "auto",

      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  setTab(val: number) {
    this.test = val
  }


}
