import { MemberCustomerComponent } from './member-customer/member-customer.component';
import { CustomerManagementComponent } from './customer-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CustomerManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'member-customer',
        pathMatch: 'full',
      },
      {
        path: 'member-customer',
        loadChildren: () => import('./member-customer/member-customer.module').then( mod => mod.MemberCustomerModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
