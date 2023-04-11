import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  isLoggedInValue: any;
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    this.isLoggedInValue = localStorage.getItem('isLoggedIn');
    if (this.isLoggedInValue == 'Yes') {
      return true;
    }
    else {
      alert('You are currently not logged in, please provide Login!');
      this.router.navigate(['']);
      return false;
    }
  }

}
