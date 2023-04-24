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
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent {
  public loading = false;
  requestedRideBTN = false;
  isData = false;
  userEmail: string;
  data: any;
  toFilterData="All"
  fromFilterData = "All";
  rideFromList = [];
  rideToList = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  dataSource = new MatTableDataSource<any>()

  displayedColumns: string[] = ["Name", "Mobile No", "Vehicle No","Ride From","Ride To", "Number of Seats Available", "View", "Action"]

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
    this.isData = false;
    this.rideFromList = [];
    this.rideToList = [];
    this.allserviceService.getDashboardRidesList().subscribe((data: any) => {
      const result = data.data.filter((res: { emailId: any; }) => res.emailId !== this.userEmail);
      this.data = result;
      this.dataSource.data = result;
      result.forEach(element => {
        this.rideFromList.push(element.from);
        this.rideToList.push(element.to);
      });

      this.rideToList = [...new Set(this.rideToList)];
      this.rideFromList = [...new Set(this.rideFromList)];
      
      if (this.dataSource.data.length > 0) {
        this.isData = true;
      }
      this.loading = false;
    }, (error) => {
      this.isData = false;
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

  requestRide(data: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(RequestRideComponent, {
      width: 'auto',
      height: "auto",
      enterAnimationDuration,
      exitAnimationDuration,
    });
    let instance = dialogRef.componentInstance;
    instance.requestRideDetails = data;
  }
  onToFilterSelect(event: any) {
    this.toFilterData = event.target.value;
    this.filterData();
  }
  onFromFilterSelect(event: any) {
    this.fromFilterData = event.target.value;
    this.filterData();
  }
  filterData(){
    
    if(this.fromFilterData === 'All' && this.toFilterData === 'All'){
      this.dataSource.data = this.data;
    }else if(this.fromFilterData !== 'All' && this.toFilterData === 'All'){
      this.dataSource.data = this.data.filter(res => res.from.toUpperCase() === this.fromFilterData.toUpperCase());
    }else if(this.fromFilterData === 'All' && this.toFilterData !== 'All'){
      this.dataSource.data = this.data.filter(res => res.to.toUpperCase() === this.toFilterData.toUpperCase());
    }else if(this.fromFilterData !== 'All' && this.toFilterData !== 'All'){
      this.dataSource.data = this.data.filter((res: { to: any; from: any; }) => res.to.toUpperCase() === this.toFilterData.toUpperCase() && res.from.toUpperCase() === this.fromFilterData.toUpperCase());
    }
  }


}
