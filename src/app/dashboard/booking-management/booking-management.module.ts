import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingManagementRoutingModule } from './booking-management-routing.module';
import { BookingManagementListComponent } from './booking-management-list/booking-management-list.component';
import { BookingManagementFormComponent } from './booking-management-form/booking-management-form.component';
import { BookingManagementDetailComponent } from './booking-management-detail/booking-management-detail.component';


@NgModule({
  declarations: [
    BookingManagementListComponent,
    BookingManagementFormComponent,
    BookingManagementDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookingManagementRoutingModule
  ]
})
export class BookingManagementModule { }
