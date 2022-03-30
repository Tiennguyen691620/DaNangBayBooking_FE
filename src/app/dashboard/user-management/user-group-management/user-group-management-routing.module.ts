import { UserGroupManagementComponent } from './user-group-management.component';
import { UserGroupManagementListComponent } from './user-group-management-list/user-group-management-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserGroupManagementComponent,
    children:[
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: UserGroupManagementListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupManagementRoutingModule { }
