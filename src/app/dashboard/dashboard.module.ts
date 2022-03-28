import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { AccountAdminComponent } from './account-admin/account-admin.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { RequestSupportComponent } from './request-support/request-support.component';
import { SourceDataManagementComponent } from './source-data-management/source-data-management.component';


@NgModule({
  declarations: [DashboardComponent, AccountAdminComponent, BookingManagementComponent, RequestSupportComponent, SourceDataManagementComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule, 
    SharedModule
  ]
})
export class DashboardModule { }
