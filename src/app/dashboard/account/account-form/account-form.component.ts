import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { ETypeForm } from 'src/app/shared/emun/type-form.enum';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import DateTimeConvertHelper from 'src/app/shared/helpers/datetime-convert.helper';
import Utils from 'src/app/shared/helpers/utils.helper';
import { CustomerModel } from 'src/app/shared/models/customer/customer.model';
import { LocationModel } from 'src/app/shared/models/master-data/location.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import {
  FileService,
  FileUploadController,
} from 'src/app/shared/services/file.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;
  accountForm: FormGroup;
  customer = new CustomerModel();
  customerBackup = new CustomerModel();
  avatarUrl: string;
  avatarUrlBackup?: string;
  uploadController: any;
  provinceList: LocationModel[] = [];
  districtList: LocationModel[] = [];
  subDistrictList: LocationModel[] = [];
  eTypeForm = ETypeForm;
  loadingImage = false;
  

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private authService: AuthService,
    private masterDataService: MasterDataService,
    private notification: NzNotificationService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.masterDataService.getProvince().subscribe((res) => {
      this.provinceList = res;
    });
    this.updateForm(this.eTypeForm.view);
    this.customerService
      .getCustomerDetail(this.authService.getAuthenticationModel()?.id)
      .subscribe((result) => {
        this.customer = result;
        this.avatarUrl = result.avatar;
        this.avatarUrlBackup = result.avatar;
        this.uploadController = {
          fileUrl: result.avatar,
        };
        this.accountForm.patchValue(result);
      });
    // this.accountForm.disable();
  }

  createForm(): void {
    this.accountForm = this.fb.group({
      no: [''],
      // avatar: [null, [CustomValidator.required]],
      fullName: ['', [CustomValidator.required]],
      phoneNumber: ['', [CustomValidator.required]],
      identityCard: ['', [CustomValidator.required]],
      email: ['', [CustomValidator.required, CustomValidator.email]],
      dob: ['', [CustomValidator.required]],
      gender: ['', CustomValidator.required],
      activeDate: null,
      province: ['', CustomValidator.required],
      district: ['', CustomValidator.required],
      subDistrict: ['', CustomValidator.required],
      address: ['', CustomValidator.required],
    });
  }

  submitForm(): void {
    const doSubmit = () => {
      if (this.accountForm.valid) {
        // console.log(this.mapData(this.accountForm.getRawValue()));
        this.customerService
          .updateCustomer(this.mapData(this.accountForm.getRawValue()))
          .subscribe((res) => {
            this.notification.success(
              'Cập nhật thông tin thành công',
              '',
              Utils.setStyleNotification()
            );
          });
        // this.avatarUrlBackup = this.avatarUrl;
        this.type = this.eTypeForm.view;
        this.updateForm(this.eTypeForm.view);
      }
    };
    if (this.uploadController?.progress) {
      new Promise(this.uploadController.progress).then(doSubmit);
    } else {
      doSubmit();
    }
  }

  mapData(item): any {
    if (!item) {
      return;
    }
    return {
      id: this.customer?.id,
      no: item.no,
      fullName: item.fullName,
      phoneNumber: item.phoneNumber,
      email: item.email,
      identityCard: item.identityCard,
      dob: DateTimeConvertHelper.fromDtObjectToTimestamp(item.dob),
      gender: item.gender,
      address: item.address,
      avatar: this.uploadController?.fileUrl,
      province: item.province,
      district: item.district,
      subDistrict: item.subDistrict,
      activeDate: DateTimeConvertHelper.fromDtObjectToTimestamp(item.activeDate),
    };
  }

  changeProvince(province: LocationModel): void {
    if (province) {
      this.accountForm.get('district').disable();
      this.masterDataService
        .getDistrict(province.locationID)
        .subscribe((res) => {
          this.districtList = res;
        });
    }
    if (!province) {
      this.accountForm.get('district').disable();
      this.districtList = [];
    }
    this.accountForm.get('district').patchValue(null);
  }

  changeDistrict(district: LocationModel): void {
    if (district) {
      this.accountForm.get('subDistrict').disable();
      this.masterDataService
        .getSubDistrict(district.locationID)
        .subscribe((res) => {
          this.subDistrictList = res;
        });
    }
    if (!district) {
      this.accountForm.get('subDistrict').disable();
      this.subDistrictList = [];
    }
    this.accountForm.get('subDistrict').patchValue(null);
  }

  updateForm(typeForm: string): void {
    if (typeForm === this.eTypeForm.view) {
      this.accountForm.disable();
    }
    if (typeForm !== this.eTypeForm.view) {
      this.accountForm.enable();
      this.accountForm.get('no').disable();
      this.accountForm.get('activeDate').disable();
    }
  }

  edit(): void {
    this.type = this.eTypeForm.edit;
    this.customerBackup = { ...this.accountForm.getRawValue() };
    this.updateForm(this.eTypeForm.edit);
  }

  cancel(): void {
    this.type = this.eTypeForm.view;
    this.updateForm(this.eTypeForm.view);
    this.accountForm.patchValue(this.customerBackup);
    this.avatarUrl = this.avatarUrlBackup;
    this.uploadController = { fileUrl: this.avatarUrlBackup };
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isJpgOrPng) {
        this.notification.error(
          'Bạn chỉ có thể tải lên tệp JPG, JPEG hoặc PNG!',
          '',
          Utils.setStyleNotification()
        );
        observer.complete();
        return;
      }
      const isLt10M = file.size! / 10 / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.notification.error(
          'Hình ảnh phải nhỏ hơn 10MB!',
          '',
          Utils.setStyleNotification()
        );
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt10M);
      observer.complete();
    });
  };

  handleUpload = (item: any): any => {
    const uploadController = new FileUploadController(
      item.file,
      this.fileService.uploadImage(item.file),
      item
    );
    this.uploadController = uploadController;
  };

  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loadingImage = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loadingImage = false;
          this.avatarUrl = img;
          this.authService.setChangeImage(this.avatarUrl);
        });
        // this.submit();
        break;
      case 'error':
        this.notification.error(
          'Đã xảy ra lỗi!',
          '',
          Utils.setStyleNotification()
        );
        this.loadingImage = false;
        break;
    }
  }

  compareDictionaryMasterData = (o1: LocationModel, o2: LocationModel) =>
    o1 && o2 ? o1.locationID === o2.locationID : o1 === o2;
}
