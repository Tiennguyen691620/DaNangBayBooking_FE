import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
import { EmployeeManagementListComponent } from './employee-management-list/employee-management-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeManagementFormComponent } from './employee-management-form/employee-management-form.component';
import { EmployeeManagementViewComponent } from './employee-management-view/employee-management-view.component';
import { EmployeeManagementEditComponent } from './employee-management-edit/employee-management-edit.component';
import { EmployeeManagementCreateComponent } from './employee-management-create/employee-management-create.component';


@NgModule({
  declarations: [
    EmployeeManagementListComponent,
    EmployeeManagementFormComponent,
    EmployeeManagementViewComponent,
    EmployeeManagementEditComponent,
    EmployeeManagementCreateComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
    SharedModule
  ]
})
export class EmployeeManagementModule { }
