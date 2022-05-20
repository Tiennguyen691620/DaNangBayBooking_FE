import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportStatisticalRoutingModule } from './report-statistical-routing.module';
import { RevenueManagementComponent } from './revenue-management/revenue-management.component';
import { CancelBookedComponent } from './cancel-booked/cancel-booked.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RevenueManagementComponent,
    CancelBookedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportStatisticalRoutingModule
  ]
})
export class ReportStatisticalModule { }
