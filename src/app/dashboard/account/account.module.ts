import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountChangePassComponent } from './account-change-pass/account-change-pass.component';
import { AccountViewComponent } from './account-view/account-view.component';

@NgModule({
  declarations: [AccountChangePassComponent, AccountViewComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
