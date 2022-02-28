import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionsRoutingModule } from './exceptions-routing.module';
import { Exception403Component } from './exception403/exception403.component';
import { Exception404Component } from './exception404/exception404.component';
import { Exception500Component } from './exception500/exception500.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    Exception403Component,
    Exception404Component,
    Exception500Component
  ],
  imports: [
    CommonModule,
    ExceptionsRoutingModule,
    SharedModule
  ]
})
export class ExceptionsModule { }
