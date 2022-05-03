import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';


@NgModule({
  declarations: [
    AccommodationListComponent,
    AccommodationDetailComponent
  ],
  imports: [
    CommonModule,
    AccommodationRoutingModule,
    SharedModule
  ]
})
export class AccommodationModule { }
