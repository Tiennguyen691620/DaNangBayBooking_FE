import { AccommodationManagementEditComponent } from './accommodation-management-edit/accommodation-management-edit.component';

import { AccommodationManagementListComponent } from './accommodation-management-list/accommodation-management-list.component';
import { AccommodationManagementComponent } from './accommodation-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilityManagementComponent } from './utility-management/utility-management.component';
import { AccommodationManagementCreateComponent } from './accommodation-management-create/accommodation-management-create.component';
import { AccommodationManagementViewComponent } from './accommodation-management-view/accommodation-management-view.component';

const routes: Routes = [
  {
    path: '',
    component: AccommodationManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: AccommodationManagementListComponent,
      },
      {
        path: 'create',
        component: AccommodationManagementCreateComponent,
      },
      {
        path: 'edit/:id',
        component: AccommodationManagementEditComponent,
      },
      {
        path: 'view/:id',
        component: AccommodationManagementViewComponent,
      },
      {
        path: 'utility',
        component: UtilityManagementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationManagementRoutingModule { }
