import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NotiticationType } from 'src/app/shared/emun/notification-type.enum';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import DateTimeConvertHelper from 'src/app/shared/helpers/datetime-convert.helper';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';
import { LocationModel } from 'src/app/shared/models/master-data/location.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { SignUpNotificationPopupComponent } from '../sign-up-notification-popup/sign-up-notification-popup.component';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.scss'],
})
export class SignupPopupComponent implements OnInit {
  signUpForm: FormGroup;
  isSubmitted = false;
  provinceList: LocationModel[] = [];
  districtList: LocationModel[] = [];
  subDistrictList: LocationModel[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private modalService: NzModalService,
    private location: Location,
    private masterDataService: MasterDataService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.masterDataService.getProvince().subscribe((res) => {
      this.provinceList = res;
    });
    this.changeProvince(null);
    this.changeDistrict(null);
  }

  createForm(): void {
    this.signUpForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        identityCard: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, CustomValidator.phoneNumber]],
        email: ['', [Validators.required, Validators.email]],
        province: ['', [Validators.required]],
        district: ['', [Validators.required]],
        subDistrict: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  submitForm(): void {
    this.isSubmitted = true;
    if (this.signUpForm.valid) {
      this.authService.signIn(this.mapData()).subscribe(
        (res) => {
          this.goBack();
        },
        (err) => {}
      );
    }
  }

  mapData(): any {
    const data = this.signUpForm.getRawValue();
    return {
      fullName: data.fullName,
      dob: DateTimeConvertHelper.fromDtObjectToTimestamp(data.dob),
      gender: data.gender,
      identityCard: data.identityCard,
      phoneNumber: data.phoneNumber,
      email: data.email,
      province: data.province,
      district: data.district,
      subDistrict: data.subDistrict,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
  }

  goBack(): void {
    const modal = this.modalService.create({
      nzContent: SignUpNotificationPopupComponent,
      nzComponentParams: {
        title: 'Thông báo',
        type: NotiticationType.Success,
        subTitle: 'Đăng ký thành công!',
        // content: `Cảm ơn bạn đã đăng ký tài khoản trên hệ thống Crystal Bay Group.
        // Vui lòng kiểm tra email và nhấp vào đường dẫn để xác thực tài khoản.
        // Nếu không nhận được email vui lòng kiểm tra Spam.`,
        btnTitle: 'Quay về trang chủ',
      },
      nzWidth: 600,
      nzFooter: null,
      nzClosable: null,
    });
    modal.afterClose.subscribe((result) => {
      this.router.navigate(['home']);
    });
  }

  changeProvince(province: LocationModel): void {
    if (province) {
      this.signUpForm.get('district').enable();
      this.masterDataService
        .getDistrict(province.locationID)
        .subscribe((res) => {
          this.districtList = res;
        });
    }
    if (!province) {
      this.signUpForm.get('district').disable();
      this.districtList = [];
    }
    this.signUpForm.get('district').patchValue(null);
  }

  changeDistrict(district: LocationModel): void {
    if (district) {
      this.signUpForm.get('subDistrict').enable();
      this.masterDataService
        .getSubDistrict(district.locationID)
        .subscribe((res) => {
          this.subDistrictList = res;
        });
    }
    if (!district) {
      this.signUpForm.get('subDistrict').disable();
      this.subDistrictList = [];
    }
    this.signUpForm.get('subDistrict').patchValue(null);
  }


  goBackToLogin(): void {
    this.modal.destroy();
    this.modalService.create({
      // nzTitle: 'Đăng nhập',
      nzContent: LoginPopupComponent,
      nzCloseIcon: 'false',
      nzWidth: 400,
      nzFooter: null,
    });
  }
}
