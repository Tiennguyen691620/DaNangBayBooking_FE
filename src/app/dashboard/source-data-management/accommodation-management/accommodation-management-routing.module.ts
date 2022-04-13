import { AccommodationManagementListComponent } from './accommodation-management-list/accommodation-management-list.component';
import { AccommodationManagementComponent } from './accommodation-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { flush } from '@angular/core/testing';

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
        component: AccommodationManagementListComponent,
      },
      {
        path: 'view/:id',
        component: AccommodationManagementListComponent,
      },
      {
        path: 'edit/:id',
        component: AccommodationManagementListComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccommodationManagementRoutingModule { }
