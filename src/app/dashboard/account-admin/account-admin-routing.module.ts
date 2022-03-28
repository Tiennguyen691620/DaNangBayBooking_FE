import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';
import { AccountAdminComponent } from './account-admin.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'account-profile',
        pathMatch: 'full',
      },
      {
        path: 'account-profile',
        component: AccountProfileComponent,
      },
      {
        path: 'account-change-password',
        component: AccountChangePasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountAdminRoutingModule { }
