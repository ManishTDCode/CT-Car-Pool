import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthguardGuard } from './Services/authGuardService/authguard.guard';
import { RequestRideDashboardComponent } from './Components/request-ride-dashboard/request-ride-dashboard.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/Components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path: 'requestedRide',
    component: RequestRideDashboardComponent,
    canActivate: [AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
