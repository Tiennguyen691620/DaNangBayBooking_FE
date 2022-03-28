import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestSupportRoutingModule } from './request-support-routing.module';
import { RequestSupportListComponent } from './request-support-list/request-support-list.component';


@NgModule({
  declarations: [
    RequestSupportListComponent
  ],
  imports: [
    CommonModule,
    RequestSupportRoutingModule
  ]
})
export class RequestSupportModule { }
