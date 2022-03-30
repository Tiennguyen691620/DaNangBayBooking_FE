import { EmployeeManagementComponent } from './employee-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagementListComponent } from './employee-management-list/employee-management-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: EmployeeManagementListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagementRoutingModule { }
