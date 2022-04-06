import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomTypeManagementRoutingModule } from './room-type-management-routing.module';
import { RoomTypeManagementCreateComponent } from './room-type-management-create/room-type-management-create.component';
import { RoomTypeManagementFormComponent } from './room-type-management-form/room-type-management-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoomTypeManagementEditComponent } from './room-type-management-edit/room-type-management-edit.component';


@NgModule({
  declarations: [
    RoomTypeManagementCreateComponent,
    RoomTypeManagementFormComponent,
    RoomTypeManagementEditComponent
  ],
  imports: [
    CommonModule,
    RoomTypeManagementRoutingModule,
    SharedModule,
  ]
})
export class RoomTypeManagementModule { }
