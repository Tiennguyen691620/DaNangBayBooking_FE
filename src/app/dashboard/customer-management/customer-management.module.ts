import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { MemberCustomerComponent } from './member-customer/member-customer.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MemberCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerManagementRoutingModule,
    SharedModule
  ]
})
export class CustomerManagementModule { }
