import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { UserGroupManagementComponent } from './user-group-management/user-group-management.component';


@NgModule({
  declarations: [
    EmployeeManagementComponent,
    UserGroupManagementComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
