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
  province: LocationModel[] = [];
  photoUpload = [];
  uploadController = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fileService: FileService,
    private accommodationService: AccommodationService,
    private masterDataService: MasterDataService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    forkJoin(
      this.accommodationService.getAllAccommodationType(),
      this.masterDataService.getProvince()
    ).subscribe(([res1, res2]) => {
      this.accommodationType = res1;
      this.province = res2;
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
    this.createForm();
    this.route.queryParams.subscribe((queryParams) => {
      if (!queryParams?.tab) {
        this.router.navigate(['.'], {
          relativeTo: this.route,
          queryParams: { tab: 'one' },
          queryParamsHandling: 'merge',
        });
      }
    });
    // this.typeForm = this.route.snapshot.queryParams.get('typeForm');
    // if (this.typeForm !== this.eTypeForm.create) {
    //   this.id = this.route.snapshot.params.id.includes('?')
    //     ? this.route.snapshot.params.id.split('?')[0]
    //     : this.route.snapshot.params.id;
    // }
  }

  createForm(): void {
    this.accommodationForm = this.fb.group({
      no: null,
      name: ['', Validators.required],
      abbreviationName: ['', Validators.required],
      accommodationType: ['', Validators.required],
      location: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      mapUrl: null,
      description: null,
      image: null,
    });
    if (this.type === this.eTypeForm.view) {
      this.accommodationForm.disable();
    }
    if (this.type !== this.eTypeForm.view) {
      this.accommodationForm.enable();
    }
    if(this.type === this.eTypeForm.edit){
      this.accommodationForm.get('no').disable();
    }
    if(this.type === this.eTypeForm.create){
      this.accommodationForm.get('no').disable();
    }
  }
  submitForm(): void {
    const doSubmit = () => {
      if (this.accommodationForm.valid) {
        this.accommodationService
          .createOrUpdate(this.mappingRequest())
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

  mappingRequest(): any {
    const valueForm = this.accommodationForm.getRawValue();
    return {
      accommodationID: this.id,
      no: valueForm.no,
      name: valueForm.name,
      abbreviationName: valueForm.abbreviationName,
      description: valueForm.description,
      accommodationType: valueForm.accommodationType,
      location: valueForm.location,
      address: valueForm.address,
      mapUrl: valueForm.mapUrl,
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
          if (this.photoUpload.length < 5) {
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
    if (this.uploadController.length < 5) {
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

  compareAccommodationType = (
    o1: AccommodationTypeModel,
    o2: AccommodationTypeModel
  ) =>
    o1 && o2 ? o1.accommodationTypeID == o2.accommodationTypeID : o1 === o2;

  compareProvince = (o1: LocationModel, o2: LocationModel) =>
    o1 && o2 ? o1.locationID == o2.locationID : o1 === o2;
}
