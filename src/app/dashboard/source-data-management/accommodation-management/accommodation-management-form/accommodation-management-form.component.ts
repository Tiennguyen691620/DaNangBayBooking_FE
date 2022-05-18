import { PopupGoogleMapComponent } from './../../../../shared/components/popups/popup-google-map/popup-google-map.component';
import { FileUploadController, FileService } from './../../../../shared/services/file.service';
import { MasterDataService } from './../../../../shared/services/master-data.service';
import { LocationModel } from 'src/app/shared/models/master-data/location.model';
import { AccommodationTypeModel } from './../../../../shared/models/accommodation/accommodation-type.model';
import { AccommodationModel } from './../../../../shared/models/accommodation/accommodation.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccommodationService } from './../../../../shared/services/accommodation.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ETypeForm } from './../../../../shared/enum/type-form.enum';
import { Component, Input, OnInit } from '@angular/core';
import Utils from 'src/app/shared/helpers/utils.helper';
import { forkJoin, Observable, Observer } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PopupConfirmComponent } from 'src/app/shared/components/popups/popup-confirm/popup-confirm.component';
import { UploadAdapter } from 'src/app/shared/helpers/upload-adapter';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-accommodation-management-form',
  templateUrl: './accommodation-management-form.component.html',
  styleUrls: ['./accommodation-management-form.component.scss'],
})
export class AccommodationManagementFormComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;
  eTypeForm = ETypeForm;
  // typeForm: string;
  imageShowPopupView: FileUploadController[];
  indexOfImage: number;
  loadingImage: boolean;
  accommodationForm: FormGroup;
  accommodation = new AccommodationModel();
  accommodationBackup = new AccommodationModel();
  accommodationType: AccommodationTypeModel[];
  provinceList: LocationModel[] = [];
  districtList: LocationModel[] = [];
  subDistrictList: LocationModel[] = [];
  photoUpload = [];
  uploadController = [];
  public editor = ClassicEditor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fileService: FileService,
    private accommodationService: AccommodationService,
    private masterDataService: MasterDataService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private notify: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
    forkJoin(
      this.accommodationService.getAllAccommodationType(),
      this.masterDataService.getProvince()
    ).subscribe(([res1, res2]) => {
      this.accommodationType = res1;
      this.provinceList = res2;
    });
    if (this.id) {
      this.accommodationService
        .detailAccommodation(this.id)
        .subscribe((res) => {
          this.accommodation = res;
          this.accommodationBackup = { ...this.accommodation };
          (this.accommodation?.images ?? []).forEach((item) => {
            this.photoUpload.push(item.image);
            this.uploadController.push({ fileUrl: item.image });
          });
          this.accommodationForm.patchValue(res);
        });
    }
    // if(!this.id){
    //   this.changeProvince(null);
    // }
    this.route.queryParams.subscribe((queryParams) => {
      if (!queryParams?.tab) {
        this.router.navigate(['.'], {
          relativeTo: this.route,
          queryParams: { tab: 'one' },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  createForm(): void {
    this.accommodationForm = this.fb.group({
      no: null,
      name: ['', Validators.required],
      abbreviationName: ['', Validators.required],
      accommodationType: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      subDistrict: ['', Validators.required],
      mapURL: null,
      description: null,
      image: null,
    });
    if (this.type === this.eTypeForm.view) {
      this.accommodationForm.disable();
    }
    if (this.type !== this.eTypeForm.view) {
      this.accommodationForm.enable();
    }
    if (this.type === this.eTypeForm.edit) {
      this.accommodationForm.get('no').disable();
    }
    // if (this.type === this.eTypeForm.create) {
    //   this.accommodationForm.get('no').disable();
    // }
  }
  submitForm(): void {
    const doSubmit = () => {
      if (this.accommodationForm.valid) {
        this.accommodationService
          .createOrUpdate(this.mapData())
          .subscribe((_) => {
            this.notification.success(
              this.id ? 'Cập nhật thành công !' : 'Tạo mới thành công !',
              '',
              Utils.setStyleNotification()
            );
          });
        if (this.id) {
          this.type = this.eTypeForm.view;
          this.accommodationBackup = {
            ...this.accommodationForm.getRawValue(),
          };
          this.accommodationForm.disable();
          return;
        }
        this.router.navigate([
          '/dashboard/source-data-management/accommodation/list',
        ]);
      }
    };
    const uploadProgresses = [];
    for (const item of this.uploadController) {
      if (
        item &&
        item.uploadController &&
        !item.uploadController.id &&
        item.uploadController.progress
      ) {
        uploadProgresses.push(item.uploadController.progress);
      }
    }
    if ((uploadProgresses ?? []).length < 0) {
      Promise.all(uploadProgresses).then(doSubmit);
    } else {
      doSubmit();
    }
  }

  edit(): void {
    this.type = this.eTypeForm.edit;
    this.accommodationForm.enable();
    this.accommodationForm.get('no').disable();
  }

  cancel(): void {
    if (this.type === this.eTypeForm.create) {
      this.router.navigate([
        '/dashboard/source-data-management/accommodation/list',
      ]);
      return;
    }

    this.accommodation = { ...this.accommodationBackup };
    (this.accommodation?.images ?? []).forEach((item) => {
      // this.photoUpload.push(item?.image);
      this.uploadController.push({ fileUrl: item?.image });
    });
    this.accommodationForm.patchValue(this.accommodation);
    this.type = this.eTypeForm.view;
    this.accommodationForm.disable();
  }

  mapData(): any {
    const valueForm = this.accommodationForm.getRawValue();
    return {
      accommodationID: this.id,
      no: valueForm.no,
      name: valueForm.name,
      abbreviationName: valueForm.abbreviationName,
      description: valueForm.description,
      accommodationType: valueForm.accommodationType,
      province: valueForm.province,
      district: valueForm.location,
      subDistrict: valueForm.subDistrict,
      address: valueForm.address,
      mapURL: valueForm.mapURL,
      email: valueForm.email,
      phone: valueForm.phone,
      images: (this.uploadController ?? []).map((item, index) => {
        const image = {
          id: (this.accommodation.images ?? [])[index]
            ? (this.accommodation.images ?? [])[index].id
            : null,
          image: item.fileUrl,
        };
        if (!image?.id) {
          delete image?.id;
        }
        return image;
      }),
    };
  }

  changeProvince(province: LocationModel): void {
    if (province) {
      if (this.type !== this.eTypeForm.view) {
        this.accommodationForm.get('district').enable();
      }
      this.masterDataService
        .getDistrict(province.locationID)
        .subscribe((res) => {
          this.districtList = res;
        });
    }
    if (!province) {
      this.accommodationForm.get('district').disable();
      this.districtList = [];
    }
    this.accommodationForm.get('district').patchValue(null);
  }

  changeDistrict(district: LocationModel): void {
    if (district) {
      if (this.type !== this.eTypeForm.view) {
        this.accommodationForm.get('subDistrict').enable();
      }
      this.masterDataService
        .getSubDistrict(district.locationID)
        .subscribe((res) => {
          this.subDistrictList = res;
        });
    }
    if (!district) {
      this.accommodationForm.get('subDistrict').disable();
      this.subDistrictList = [];
    }
    this.accommodationForm.get('subDistrict').patchValue(null);
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
      }
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

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loadingImage = true;
        break;
      case 'done':
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loadingImage = false;
          if (this.photoUpload.length < 6) {
            this.photoUpload.push(img);
          }
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
    if (this.uploadController.length < 6) {
      this.uploadController.push(uploadController);
    }
  };

  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  actionImage(file: NzUploadFile): Observable<any> {
    return this.fileService.uploadImage(file?.originFileObj as File);
  }

  viewImage(imageUrlArray, indexOfImage): void {
    this.imageShowPopupView = [
      ...imageUrlArray.map((item) => {
        item;
      }),
    ];
    this.indexOfImage = indexOfImage;
  }
  closeView(): void {
    this.imageShowPopupView = null;
  }

  deleteImage(index: number): void {
    this.photoUpload.splice(index, 1);
    this.uploadController.splice(index, 1);
  }

  getTabIndex(): number {
    switch (this.route.snapshot.queryParamMap.get('tab')) {
      case 'one':
        return 0;
        break;
      case 'two':
        return 1;
        break;
      case 'three':
        return 2;
        break;
      case 'four':
        return 3;
        break;
      default:
        return 0;
    }
  }

  viewMap(): void {
    const isCorrectFormat =
      this.accommodationForm.getRawValue().mapURL &&
      this.accommodationForm.getRawValue().mapURL.length &&
      this.accommodationForm
        .getRawValue()
        .mapURL.trim()
        .startsWith('<iframe') &&
      this.accommodationForm.getRawValue().mapURL.trim().endsWith(`</iframe>`);
    const modal = this.modalService.create({
      nzContent: PopupGoogleMapComponent,
      nzComponentParams: {
        content: this.accommodationForm.getRawValue().mapURL,
        isCorrectFormat,
      },
      nzFooter: null,
      nzWidth: isCorrectFormat ? (window.innerWidth * 7) / 10 : 350,
    });

    modal.afterClose.subscribe((result) => {});
  }

  onReady(eventData): any {
    eventData.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new UploadAdapter(
        loader,
        this.fileService,
        this.accommodationForm.get('description')
      );
    };
  }

  compareAccommodationType = (
    o1: AccommodationTypeModel,
    o2: AccommodationTypeModel
  ) =>
    o1 && o2 ? o1.accommodationTypeID == o2.accommodationTypeID : o1 === o2;

  compareDictionaryMasterData = (o1: LocationModel, o2: LocationModel) =>
    o1 && o2 ? o1.locationID === o2.locationID : o1 === o2;
}
