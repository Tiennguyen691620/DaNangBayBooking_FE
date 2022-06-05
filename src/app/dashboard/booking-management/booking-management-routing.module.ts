import { BookingManagementListComponent } from './booking-management-list/booking-management-list.component';
import { BookingManagementComponent } from './booking-management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingManagementDetailComponent } from './booking-management-detail/booking-management-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BookingManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: BookingManagementListComponent
      },
      {
        path: 'detail/:id',
        component: BookingManagementDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingManagementRoutingModule { }
