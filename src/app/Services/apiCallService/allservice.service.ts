import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllserviceService {

  constructor(private http: HttpClient) { }

  name = new BehaviorSubject('');
  emmailId = new BehaviorSubject('');
  mobileNo = new BehaviorSubject('');
  otp = new BehaviorSubject('');

  signUPDetails(data: any) {
    return this.http.post('http://localhost:7000/signup', data);
  }

  createRide(data: any) {
    return this.http.post('http://localhost:7000/createRide', data);
  }
}
