import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PopupConfirmComponent } from './../../../shared/components/popups/popup-confirm/popup-confirm.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import Utils from 'src/app/shared/helpers/utils.helper';

@Component({
  selector: 'app-account-change-pass',
  templateUrl: './account-change-pass.component.html',
  styleUrls: ['./account-change-pass.component.scss'],
})
export class AccountChangePassComponent implements OnInit {
  changePassForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private authService: AuthService,
    private modal: NzModalService,
    private notification: NzNotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.changePassForm = this.fb.group(
      {
        oldPassword: [null, [CustomValidator.required]],
        newPassword: [
          null,
          [CustomValidator.required, CustomValidator.passwordULN],
        ],
        confirmPassword: [null, [CustomValidator.required]],
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword'),
      }
    );
  }

  submitForm(): void {
    this.isSubmitted = true;
    if (this.changePassForm.valid) {
      this.customerService
        .changePassword(this.mapData(this.changePassForm.getRawValue()))
        .subscribe((res) => {
          this.notification.success(
            'Thay đổi mật khẩu thành công',
            '',
            Utils.setStyleNotification()
          );
          this.router.navigate(['/dashboard/account/profile']);
        });
    }
  }

  mapData(item): any {
    if (!item) {
      return;
    }
    return {
      id: this.authService.getAuthenticationModel()?.id,
      oldPassword: item.oldPassword,
      newPassword: item.newPassword,
      confirmPassword: item.confirmPassword,
    };
  }
}
