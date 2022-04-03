import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberCustomerRoutingModule } from './member-customer-routing.module';
import { MemberCustomerListComponent } from './member-customer-list/member-customer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberCustomerCreateComponent } from './member-customer-create/member-customer-create.component';
import { MemberCustomerDetailComponent } from './member-customer-detail/member-customer-detail.component';


@NgModule({
  declarations: [
    MemberCustomerListComponent,
    MemberCustomerCreateComponent,
    MemberCustomerDetailComponent
  ],
  imports: [
    CommonModule,
    MemberCustomerRoutingModule,
    SharedModule
  ]
})
export class MemberCustomerModule { }
