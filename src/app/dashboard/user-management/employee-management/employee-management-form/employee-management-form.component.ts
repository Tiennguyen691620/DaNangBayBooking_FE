import {
  FileService,
  FileUploadController,
} from './../../../../shared/services/file.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserModel } from './../../../../shared/models/user/user.model';
import { UserService } from './../../../../shared/services/user.service';
import { LocationModel } from 'src/app/shared/models/master-data/location.model';
import { MasterDataService } from './../../../../shared/services/master-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';
import { Component, OnInit, Input } from '@angular/core';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import DateTimeConvertHelper from 'src/app/shared/helpers/datetime-convert.helper';
import Utils from 'src/app/shared/helpers/utils.helper';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-employee-management-form',
  templateUrl: './employee-management-form.component.html',
  styleUrls: ['./employee-management-form.component.scss'],
})
export class EmployeeManagementFormComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;
  eTypeForm = ETypeForm;
  avatarUrl?: string;
  avatarUrlBackup?: string;
  uploadController: any;
  loadingImage = false;
  userForm: FormGroup;
  user = new UserModel();
  userBackup = new UserModel();

  provinceList: LocationModel[] = [];
  districtList: LocationModel[] = [];
  subDistrictList: LocationModel[] = [];

  constructor(
    private fb: FormBuilder,
    private masterDataService: MasterDataService,
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.masterDataService.getProvince().subscribe((res) => {
      this.provinceList = res;
    });
    if (this.id) {
      this.type = this.eTypeForm.view;
      this.updateForm(this.eTypeForm.view);
      this.userService.getUser(this.id).subscribe((res) => {
        this.user = res;
        this.userBackup = res ;
        this.avatarUrl = res.avatar;
        this.avatarUrlBackup = res.avatar;
        this.userForm.patchValue(res);
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
    this.userForm = this.fb.group({
      no: null,
      fullName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, CustomValidator.phoneNumber]],
      email: [null, [Validators.required, Validators.email]],
      identityCard: [null, [Validators.required]],
      // dob: [null, Validators.required],
      gender: [null, Validators.required],
      province: [null, Validators.required],
      district: [null, Validators.required],
      subDistrict: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  mapData(item): any {
    if (!item) {
      return;
    }
    return {
      id: this.user?.id,
      no: item.no,
      fullName: item.fullName,
      phoneNumber: item.phoneNumber,
      email: item.email,
      identityCard: item.identityCard,
      // dob: DateTimeConvertHelper.fromTimestampToDtObject(item.dob),
      // dob: item.dob,
      gender: item.gender,
      address: item.address,
      avatar: this.uploadController?.fileUrl,
      province: item.province,
      district: item.district,
      subDistrict: item.subDistrict,
    };
  }

  submitForm(): void {
    const doSubmit = () => {
      if (this.userForm.valid) {
        this.userService
          .createOrUpdateUser(this.mapData(this.userForm.getRawValue()))
          .subscribe((res) => {
            this.notification.success(
              this.id
                ? 'Cập nhật thông tin người dùng thành công !'
                : 'Thêm người dùng mới thành công !',
              '',
              Utils.setStyleNotification()
            );
          });
        if (this.id) {
          this.type = this.eTypeForm.view;
          this.updateForm(this.eTypeForm.view);
          this.avatarUrlBackup = this.avatarUrl;
        }
        if (!this.id) {
          this.router.navigate(['/dashboard/user-management/employee/list']);
        }
      }
    };
    if (this.uploadController?.progress) {
      new Promise(this.uploadController.progress).then(doSubmit);
    } else {
      doSubmit();
    }
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
        this.userForm.get('district').enable();
      }
      this.masterDataService.getDistrict(province.locationID).subscribe((res) => {
        this.districtList = res;
      });
    }
    if (!province) {
      this.userForm.get('district').disable();
      this.districtList = [];
    }
    this.userForm.get('district').patchValue(null);
  }

  changeDistrict(district: LocationModel): void {
    if (district) {
      if (this.type !== this.eTypeForm.view) {
        this.userForm.get('subDistrict').enable();
      }
      this.masterDataService.getSubDistrict(district.locationID).subscribe((res) => {
        this.subDistrictList = res;
      });
    }
    if (!district) {
      this.userForm.get('subDistrict').disable();
      this.subDistrictList = [];
    }
    this.userForm.get('subDistrict').patchValue(null);
  }

  updateForm(typeForm: string): void {
    if (typeForm === this.eTypeForm.view) {
      this.userForm.disable();
    }
    if (typeForm !== this.eTypeForm.view) {
      this.userForm.enable();
      this.userForm.get('no').disable();
      // this.changeProvince(this.userForm.get('province').value);
      // this.changeDistrict(this.userForm.get('district').value);
    }
  }

  cancel(): void {
    if (this.id && this.type === this.eTypeForm.edit) {
      this.type = this.eTypeForm.view;
      this.updateForm(this.eTypeForm.view);
      this.userForm.patchValue(this.userBackup);
      this.avatarUrl = this.avatarUrlBackup;
      this.uploadController = { fileUrl: this.avatarUrlBackup };
      return;
    }
    if (this.id && this.type === this.eTypeForm.view) {
      this.router.navigate(['/dashboard/user-management/employee/list']);
    }
    if (!this.id) {
      this.router.navigate(['/dashboard/user-management/employee/list']);
    }
  }

  edit(): void {
    this.type = this.eTypeForm.edit;
    this.updateForm(this.eTypeForm.edit);
    this.userBackup = {...this.userForm.getRawValue()};
  }

  disabledBirthDate = (fromDate: Date): boolean => {
    return fromDate.setHours(0, 0, 0, 0) > new Date().setHours(23, 59, 59, 999);
  };

  compareDictionaryMasterData = (o1: LocationModel, o2: LocationModel) =>
    o1 && o2 ? o1.locationID === o2.locationID : o1 === o2;
}
