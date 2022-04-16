import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourceDataManagementRoutingModule } from './source-data-management-routing.module';
import { AccommodationManagementComponent } from './accommodation-management/accommodation-management.component';
import { RoomTypeManagementComponent } from './room-type-management/room-type-management.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AccommodationManagementComponent,
    RoomTypeManagementComponent,
  ],
  imports: [
    CommonModule,
    SourceDataManagementRoutingModule,
    SharedModule
  ]
})
export class SourceDataManagementModule { }
