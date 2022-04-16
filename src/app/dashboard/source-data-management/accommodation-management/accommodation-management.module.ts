
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccommodationManagementRoutingModule } from './accommodation-management-routing.module';
import { AccommodationManagementFormComponent } from './accommodation-management-form/accommodation-management-form.component';
import { AccommodationManagementListComponent } from './accommodation-management-list/accommodation-management-list.component';
import { AccommodationManagementCreateComponent } from './accommodation-management-create/accommodation-management-create.component';
import { AccommodationManagementRoomComponent } from './accommodation-management-room/accommodation-management-room.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UtilityManagementComponent } from './utility-management/utility-management.component';
import { AccommodationManagementEditComponent } from './accommodation-management-edit/accommodation-management-edit.component';
import { AccommodationManagementViewComponent } from './accommodation-management-view/accommodation-management-view.component';


@NgModule({
  declarations: [
    AccommodationManagementFormComponent,
    AccommodationManagementListComponent,
    AccommodationManagementCreateComponent,
    AccommodationManagementRoomComponent,
    AccommodationManagementEditComponent,
    AccommodationManagementViewComponent,
    UtilityManagementComponent,
  ],
  imports: [
    CommonModule,
    AccommodationManagementRoutingModule,
    SharedModule
  ]
})
export class AccommodationManagementModule { }
