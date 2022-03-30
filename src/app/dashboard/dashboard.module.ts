import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { AccountAdminComponent } from './account-admin/account-admin.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { RequestSupportComponent } from './request-support/request-support.component';
import { SourceDataManagementComponent } from './source-data-management/source-data-management.component';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReportStatisticalComponent } from './report-statistical/report-statistical.component';
import { DiaryLoginComponent } from './report-statistical/diary-login/diary-login.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountAdminComponent,
    BookingManagementComponent,
    RequestSupportComponent,
    SourceDataManagementComponent,
    CustomerManagementComponent,
    UserManagementComponent,
    ReportStatisticalComponent,
    DiaryLoginComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
