import { RevenueManagementComponent } from './revenue-management/revenue-management.component';
import { CancelBookedComponent } from './cancel-booked/cancel-booked.component';
import { ReportStatisticalComponent } from './report-statistical.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryLoginComponent } from './diary-login/diary-login.component';

const routes: Routes = [
  {
    path: '',
    component: ReportStatisticalComponent,
    children: [
      {
        path: '',
        redirectTo: 'cancel-booked',
        pathMatch: 'full',
      },
      {
        path: 'cancel-booked',
        component: CancelBookedComponent,
      },
      {
        path: 'diary-login',
        component: DiaryLoginComponent,
      },
      {
        path: 'revunue',
        component: RevenueManagementComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportStatisticalRoutingModule { }
