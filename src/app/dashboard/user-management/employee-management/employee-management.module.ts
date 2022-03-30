import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeeManagementListComponent } from './employee-management-list/employee-management-list.component';


@NgModule({
  declarations: [
    EmployeeManagementListComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule
  ]
})
export class EmployeeManagementModule { }
