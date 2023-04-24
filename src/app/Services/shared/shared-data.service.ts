import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  isSignIn = true;
  isForgotPassword = false;
  isVehicle = false;
  userDetails: any;

  public cancelRide = new Subject();
  cancelRide$ = this.cancelRide.asObservable();


  public isRideCreated = new Subject();
  isRideCreated$ = this.isRideCreated.asObservable();

  public isSeatUpdated = new Subject();
  isSeatUpdated$ = this.isSeatUpdated.asObservable();

  constructor() { }
}
