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
import { RequestRideComponent } from '../request-ride/request-ride.component';
@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.component.html',
  styleUrls: ['./my-rides.component.css']
})
export class MyRidesComponent {
  public loading = false;
  requestedRideBTN = false;
  userEmail: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  dataSource = new MatTableDataSource<any>()

  displayedColumns: string[] = ["Name", "Mobile No", "Vehicle No", "Ride Type", "Number of Seats Available", "View",  "Delete"]

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertifyService,
    private allserviceService: AllserviceService,
    private sharedDataService: SharedDataService
  ) { }



  ngOnInit(): void {
    console.log("this.dataSource.data", this.dataSource.data);
    this.userEmail = localStorage.getItem('userEmail');
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
    this.loading = true;
    this.allserviceService.getDashboardRidesList().subscribe((data: any) => {
      const result = data.data.filter(res => res.emailId === this.userEmail);
      this.dataSource.data = result;
      this.loading = false;
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
    instance.rideDetails = data;
    console.log("data - viewRideDetails", data);

  } 
  onDelete(data: any) {
    console.log("onDelete data", data);
    if (data.emailId === this.userEmail) {
      this.allserviceService.deleteDashboardRide(data._id).subscribe(res => {
        setTimeout(() => {
          this.getRideList();
        }, 100);
      });
    }

  }
  
}
