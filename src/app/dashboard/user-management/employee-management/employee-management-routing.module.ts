import { EmployeeManagementCreateComponent } from './employee-management-create/employee-management-create.component';
import { EmployeeManagementComponent } from './employee-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeManagementListComponent } from './employee-management-list/employee-management-list.component';
import { EmployeeManagementViewComponent } from './employee-management-view/employee-management-view.component';
import { EmployeeManagementEditComponent } from './employee-management-edit/employee-management-edit.component';

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
      },
      {
        path: 'create',
        component: EmployeeManagementCreateComponent,
      },
      {
        path: 'view/:id',
        component: EmployeeManagementViewComponent,
      },
      {
        path: 'edit/:id',
        component: EmployeeManagementEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagementRoutingModule { }
