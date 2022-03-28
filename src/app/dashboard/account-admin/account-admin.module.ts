import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountAdminRoutingModule } from './account-admin-routing.module';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AccountProfileComponent,
    AccountChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AccountAdminRoutingModule,
    SharedModule
  ]
})
export class AccountAdminModule { }
