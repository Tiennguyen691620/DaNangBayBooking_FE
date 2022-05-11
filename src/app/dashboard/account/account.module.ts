import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountChangePassComponent } from './account-change-pass/account-change-pass.component';
import { AccountViewComponent } from './account-view/account-view.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountFormComponent } from './account-form/account-form.component';

@NgModule({
  declarations: [AccountChangePassComponent, AccountViewComponent, AccountEditComponent, AccountFormComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
