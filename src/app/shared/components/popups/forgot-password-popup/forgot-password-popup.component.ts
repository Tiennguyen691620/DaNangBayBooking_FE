import { PopupConfirmComponent } from './../popup-confirm/popup-confirm.component';
import { AuthService } from './../../../services/auth/auth.service';
import { CustomerService } from './../../../services/customer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password-popup',
  templateUrl: './forgot-password-popup.component.html',
  styleUrls: ['./forgot-password-popup.component.scss'],
})
export class ForgotPasswordPopupComponent implements OnInit {
  email: string;
  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private authService: AuthService,
    private customerService: CustomerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.authService.setShowLogin(false);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authService.setShowLogin(true);
  }

  sendMail(): void {
    this.customerService.forgotPassword(this.email).subscribe((result) => {
      const modal = this.modalService.create({
        nzContent: PopupConfirmComponent,
        nzComponentParams: {
          title: 'Thông báo',
          vnContent:
            'Mật khẩu mới đã được gửi đến email của bạn. Vui lòng kiểm tra email để lấy mật khẩu và đăng nhập trở lại.',
          okBtnTitle: 'OK',
          urlCallBack: '/home',
        },
        nzFooter: null,
        nzClosable: null,
        nzWidth: 500,
      });

       modal.afterClose.subscribe((res) => {
         this.goBackToLogin();
       });
    });
  }

  goBackToLogin(): any {
    this.modal.destroy();
    this.modalService.create({
      nzContent: LoginPopupComponent,
      nzCloseIcon: 'false',
      nzWidth: 400,
      nzFooter: null,
    });
  }

  // goBack(): void {
  //   this.location.back();
  // }
}
