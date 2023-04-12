import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  isSignIn = true;
  isForgotPassword = false;
  isVehicle = false;
  userDetails:any;

 

  public isRideCreated = new Subject();
  isRideCreated$ = this.isRideCreated.asObservable();

  constructor() { }
}
