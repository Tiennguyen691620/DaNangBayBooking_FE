import { AuthGuard } from './../shared/services/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'accommodation',
        pathMatch: 'full',
      },
      {
        path: 'accommodation',
        loadChildren: () => import('./accommodation/accommodation.module').then(m => m.AccommodationModule),
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'booking-management',
        loadChildren: () => import('./booking-management/booking-management.module').then(m => m.BookingManagementModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
