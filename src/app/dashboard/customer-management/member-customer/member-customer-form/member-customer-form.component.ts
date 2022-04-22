import { FileService, FileUploadController } from './../../../../shared/services/file.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LocationModel } from 'src/app/shared/models/master-data/location.model';
import { MasterDataService } from './../../../../shared/services/master-data.service';
import { CustomerService } from './../../../../shared/services/customer.service';
import { forkJoin, Observable, Observer } from 'rxjs';
import { CustomerModel } from 'src/app/shared/models/customer/customer.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import Utils from 'src/app/shared/helpers/utils.helper';
import DateTimeConvertHelper from 'src/app/shared/helpers/datetime-convert.helper';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-member-customer-form',
  templateUrl: './member-customer-form.component.html',
  styleUrls: ['./member-customer-form.component.scss'],
})
export class MemberCustomerFormComponent implements OnInit {
  @Input() type: string;
  @Input() id: string;
  eTypeForm = ETypeForm;
  // typeForm: string;
  avatarUrl?: string;
  avatarUrlBackup?: string;
  uploadController: any;
  customerForm: FormGroup;
  customer = new CustomerModel();
  customerBackup = new CustomerModel();
  provinceList: LocationModel[] = [];
  districtList: LocationModel[] = [];
  subDistrictList: LocationModel[] = [];

  loadingImage = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private masterData: MasterDataService,
    private notification: NzNotificationService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.masterData.getProvince().subscribe((res) => {
      this.provinceList = res;
    });
    if (this.id) {
      this.type = this.eTypeForm.view;
      this.updateForm(this.eTypeForm.view);
      this.customerService.getCustomer(this.id).subscribe((res) => {
        this.customer = res;
        this.customerBackup = { ...this.customer };
        this.avatarUrl = res.avatar;
        this.avatarUrlBackup = res.avatar;
        this.uploadController = { fileUrl: res?.avatar };
        this.customerForm.patchValue(res);
      });
    }
    if (!this.id) {
      this.type = this.eTypeForm.create;
      this.updateForm(this.eTypeForm.create);
      this.changeProvince(null);
      this.changeDistrict(null);
    }
  }

  createForm(): void {
    this.customerForm = this.fb.group({
      no: null,
      fullName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, CustomValidator.phoneNumber]],
      email: [null, [Validators.required, Validators.email]],
      identityCard: [null, [Validators.required]],
      dob: [null, Validators.required],
      gender: [null, Validators.required],
      province: [null, Validators.required],
      district: [null, Validators.required],
      subDistrict: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  submit(): void {
    const doSubmit = () => {
      if (this.customerForm.valid) {
        this.customerService
          .updateCustomer(this.mapData(this.customerForm.getRawValue()))
          .subscribe((res) => {
            this.notification.success(
              this.id
                ? 'Cập nhật thông tin thành công !'
                : 'Tạo mới thông tin thành công !',
              '',
              Utils.setStyleNotification()
            );
          });
        if (this.id) {
          this.avatarUrlBackup = this.avatarUrl;
          this.type = this.eTypeForm.view;
          this.updateForm(this.eTypeForm.view);
        }
        if (!this.id) {
          this.router.navigate([
            '/dashboard/customer-management/member-customer/list',
          ]);
        }
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
      fullName: item.name,
      phoneNumber: item.phoneNumber,
      email: item.email,
      identityCard: item.identityCard,
      dob: DateTimeConvertHelper.fromDtObjectToDtStr(item.dob),
      gender: item.gender,
      address: item.address,
      avatar: this.uploadController?.fileUrl,
      province: item.province,
      district: item.district,
      subDistrict: item.subDistrict,
    };
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.notification.error(
          'Bạn chỉ có thể tải lên tệp JPG!',
          '',
          Utils.setStyleNotification()
        );
        observer.complete();
        return;
      }
      // tslint:disable-next-line:no-non-null-assertion
      const isLt10M = file.size! / 10 / 1024 / 1024 < 1;
      if (!isLt10M) {
        this.notification.error(
          `Hình ảnh ${file.name} phải nhỏ hơn 1MB!`,
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

  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    // tslint:disable-next-line:no-non-null-assertion
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  actionImage(file: NzUploadFile): Observable<any> {
    return this.fileService.uploadImage(file?.originFileObj);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loadingImage = true;
        break;
      case 'done':
        // Get this url from response in real world.
        // tslint:disable-next-line:no-non-null-assertion
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loadingImage = false;
          this.avatarUrl = img;
        });
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

  handleUpload = (item: any): any => {
    const uploadController = new FileUploadController(
      item.file,
      this.fileService.uploadImage(item.file),
      item
    );
    this.uploadController = uploadController;
  };

  changeProvince(province: LocationModel): void {
    if (province) {
      if (this.type !== this.eTypeForm.view) {
        this.customerForm.get('district').enable();
      }
      this.masterData.getDistrict(province.locationID).subscribe((res) => {
        this.districtList = res;
      });
    }
    if (!province) {
      this.customerForm.get('district').disable();
      this.districtList = [];
    }
    this.customerForm.get('district').patchValue(null);
  }

  changeDistrict(district: LocationModel): void {
    if (district) {
      if (this.type !== this.eTypeForm.view) {
        this.customerForm.get('subDistrict').enable();
      }
      this.masterData.getSubDistrict(district.locationID).subscribe((res) => {
        this.subDistrictList = res;
      });
    }
    if (!district) {
      this.customerForm.get('subDistrict').disable();
      this.subDistrictList = [];
    }
    this.customerForm.get('subDistrict').patchValue(null);
  }

  updateForm(typeForm: string): void {
    if (typeForm === this.eTypeForm.view) {
      this.customerForm.disable();
    }
    if (typeForm !== this.eTypeForm.view) {
      this.customerForm.enable();
      this.customerForm.get('no').disable();
      this.changeProvince(this.customerForm.get('province').value);
      this.changeDistrict(this.customerForm.get('district').value);
    }
  }

  cancel(): void {
    if (this.id && this.type === this.eTypeForm.edit) {
      this.type = this.eTypeForm.view;
      this.updateForm(this.eTypeForm.view);
      this.customerForm.patchValue(this.customerBackup);
      this.avatarUrl = this.avatarUrlBackup;
      this.uploadController = {
        fileUrl: this.avatarUrlBackup,
      };
      return;
    }
    if (this.id && this.type === this.eTypeForm.view) {
      this.router.navigate([
        '/dashboard/customer-management/member-customer/list',
      ]);
    }
    if (!this.id) {
      this.router.navigate([
        '/dashboard/customer-management/member-customer/list',
      ]);
    }
  }

  edit(): void {
    this.type = this.eTypeForm.edit;
    // this.router.navigate([
    //   '/dashboard/customer-management/member-customer/edit', this.id
    // ], {queryParams: {typeFom: this.eTypeForm.edit}});
    this.customerBackup = { ...this.customerForm.getRawValue() };
    this.updateForm(this.eTypeForm.edit);
  }

  disabledBirthDate = (fromDate: Date): boolean => {
    return fromDate.setHours(0, 0, 0, 0) > new Date().setHours(23, 59, 59, 999);
  };

  compareDictionaryMasterData = (o1: LocationModel, o2: LocationModel) =>
    o1 && o2 ? o1.locationID === o2.locationID : o1 === o2;
}
