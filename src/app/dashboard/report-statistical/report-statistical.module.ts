import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReportStatisticalRoutingModule } from './report-statistical-routing.module';
import { RevenueManagementComponent } from './revenue-management/revenue-management.component';
import { CancelBookedComponent } from './cancel-booked/cancel-booked.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiaryLoginComponent } from './diary-login/diary-login.component';


@NgModule({
  declarations: [
    RevenueManagementComponent,
    CancelBookedComponent,
    DiaryLoginComponent,
  ],
  imports: [CommonModule, SharedModule, ReportStatisticalRoutingModule],
  providers: [DatePipe],
})
export class ReportStatisticalModule {}
