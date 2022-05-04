import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { AccommodationComponent } from './accommodation/accommodation.component';


@NgModule({
  declarations: [DashboardComponent, AccommodationComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule, 
    SharedModule
  ]
})
export class DashboardModule { }
