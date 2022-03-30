import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserGroupManagementRoutingModule } from './user-group-management-routing.module';
import { UserGroupManagementListComponent } from './user-group-management-list/user-group-management-list.component';


@NgModule({
  declarations: [
    UserGroupManagementListComponent
  ],
  imports: [
    CommonModule,
    UserGroupManagementRoutingModule
  ]
})
export class UserGroupManagementModule { }
