import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewrideComponent } from '../viewride/viewride.component';
import { CreaterideComponent } from '../createride/createride.component';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertService/alertify.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  dataSource = new MatTableDataSource<any>()

  displayedColumns: string[] = ["Name", "Mobile No", "Vehicle No", "Ride Type", "Number of Seats Available", "View", "Action"]

  constructor(private dialog: MatDialog, private router: Router, private alertService: AlertifyService) { }

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

    this.dataSource.data = [
      {
        name: "Pallavi",
        mobileNo: "0987654321",
        vehicleNo: "MH4 16708",
        rideType: "Car",
        noOfSeats: 3

      },
      {
        name: "Pallavi",
        mobileNo: "0987654321",
        vehicleNo: "MH4 16708",
        rideType: "Car",
        noOfSeats: 3

      },
      {
        name: "Pallavi",
        mobileNo: "0987654321",
        vehicleNo: "MH4 16708",
        rideType: "Car",
        noOfSeats: 3

      },
      {
        name: "Pallavi",
        mobileNo: "0987654321",
        vehicleNo: "MH4 16708",
        rideType: "Car",
        noOfSeats: 3

      },
      {
        name: "Pallavi",
        mobileNo: "0987654321",
        vehicleNo: "MH4 16708",
        rideType: "Car",
        noOfSeats: 3

      },
      {
        name: "Pallavi",
        mobileNo: "0987654321",
        vehicleNo: "MH4 16708",
        rideType: "Car",
        noOfSeats: 3

      },


    ];
    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
      console.log("this.paginator", this.paginator);
    }

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
}
