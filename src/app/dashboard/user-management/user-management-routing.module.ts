import { UserManagementComponent } from './user-management.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children:[
      {
        path: 'employee',
        loadChildren: () => import('./employee-management/employee-management.module').then( (mod) => mod.EmployeeManagementModule),
      },
      {
        path: 'user-group',
        loadChildren: () => import('./user-group-management/user-group-management.module').then( (mod) => mod.UserGroupManagementModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
