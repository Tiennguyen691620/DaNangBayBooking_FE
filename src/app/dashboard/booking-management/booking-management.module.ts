import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingManagementRoutingModule } from './booking-management-routing.module';
import { BookingManagementListComponent } from './booking-management-list/booking-management-list.component';


@NgModule({
  declarations: [
    BookingManagementListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BookingManagementRoutingModule
  ]
})
export class BookingManagementModule { }
