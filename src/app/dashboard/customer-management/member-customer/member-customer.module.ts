import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberCustomerRoutingModule } from './member-customer-routing.module';
import { MemberCustomerListComponent } from './member-customer-list/member-customer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberCustomerCreateComponent } from './member-customer-create/member-customer-create.component';
import { MemberCustomerDetailComponent } from './member-customer-detail/member-customer-detail.component';
import { MemberCustomerFormComponent } from './member-customer-form/member-customer-form.component';
import { MemberCustomerEditComponent } from './member-customer-edit/member-customer-edit.component';


@NgModule({
  declarations: [
    MemberCustomerListComponent,
    MemberCustomerCreateComponent,
    MemberCustomerDetailComponent,
    MemberCustomerFormComponent,
    MemberCustomerEditComponent
  ],
  imports: [
    CommonModule,
    MemberCustomerRoutingModule,
    SharedModule
  ]
})
export class MemberCustomerModule { }
