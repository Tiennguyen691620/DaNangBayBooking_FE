import { MemberCustomerEditComponent } from './member-customer-edit/member-customer-edit.component';
import { MemberCustomerListComponent } from './member-customer-list/member-customer-list.component';
import { MemberCustomerComponent } from './member-customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberCustomerCreateComponent } from './member-customer-create/member-customer-create.component';
import { MemberCustomerDetailComponent } from './member-customer-detail/member-customer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MemberCustomerComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: MemberCustomerListComponent,
      },
      {
        path: 'create',
        component: MemberCustomerCreateComponent,
      },
      {
        path: 'view/:id',
        component: MemberCustomerDetailComponent,
      },
      {
        path: 'edit/:id',
        component: MemberCustomerEditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberCustomerRoutingModule { }
