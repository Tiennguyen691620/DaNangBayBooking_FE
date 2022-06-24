import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from './../../../services/auth/auth.service';
import { UserService } from './../../../services/user.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import Utils from 'src/app/shared/helpers/utils.helper';

@Component({
  selector: 'app-popup-change-password',
  templateUrl: './popup-change-password.component.html',
  styleUrls: ['./popup-change-password.component.scss'],
})
export class PopupChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private notification: NzNotificationService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.changePassForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, CustomValidator.passwordULN]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword'),
      }
    );
  }

  submitForm(): void {
    this.isSubmitted = true;
    if (this.changePassForm.valid) {
      this.userService
        .changePassword(this.mapData(this.changePassForm.getRawValue()))
        .subscribe((result) => {
          this.notification.success(
            'Thay đổi mật khẩu thành công',
            '',
            Utils.setStyleNotification()
          );
          this.modal.destroy();
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
