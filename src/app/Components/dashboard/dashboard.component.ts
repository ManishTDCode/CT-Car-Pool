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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public loading = false;
  usermobileNo: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  dataSource = new MatTableDataSource<any>()

  displayedColumns: string[] = ["Name", "Mobile No", "Vehicle No", "Ride Type", "Number of Seats Available", "View", "Action", "Delete"]

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertifyService,
    private allserviceService: AllserviceService,
    private sharedDataService: SharedDataService
  ) { }

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


  ngOnInit(): void {
    console.log("this.dataSource.data", this.dataSource.data);

    this.allserviceService.getUserDetails().subscribe((data: any) => {
      this.sharedDataService.userDetails = data.data;
      this.usermobileNo = this.sharedDataService.userDetails[0].mobileNumber;
      console.log("this.sharedDataService.userDetails", this.sharedDataService.userDetails);

    })
    this.getRideList();

    this.sharedDataService.isRideCreated$.subscribe(data => {
      if (data) {
        this.getRideList();
      }
    });
    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
      console.log("this.paginator", this.paginator);
    }

  }

  getRideList() {
    this.allserviceService.getDashboardRidesList().subscribe((data: any) => {
      this.dataSource.data = data.data;
      console.log("this.dataSource.data", this.dataSource.data);
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log("this.paginator", this.paginator);
  }

  viewRideDetails(data: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(ViewrideComponent, {
      width: 'auto',
      maxWidth: '100%',
      height: "auto",

      enterAnimationDuration,
      exitAnimationDuration,
    });
    let instance = dialogRef.componentInstance;
    instance.reideDetails = data;
    console.log("data - viewRideDetails", data);

  }

  requestRide(data: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(RequestRideComponent, {
      width: 'auto',
      maxWidth: '100%',
      height: "auto",

      enterAnimationDuration,
      exitAnimationDuration,
    });
    let instance = dialogRef.componentInstance;
    instance.requestRideDetails = data;
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
  onDelete(data: any) {
    console.log("onDelete data", data);
    if (data.mobileNo === this.usermobileNo) {
      this.allserviceService.deleteDashboardRide(data._id).subscribe(res => {
        setTimeout(() => {
          this.getRideList();
        }, 100);
      });
    }

  }
}
