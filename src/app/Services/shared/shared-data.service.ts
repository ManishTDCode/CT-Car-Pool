import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  isSignIn = true;
  isForgotPassword = false;
  isVehicle = false;
  constructor() { }
}
