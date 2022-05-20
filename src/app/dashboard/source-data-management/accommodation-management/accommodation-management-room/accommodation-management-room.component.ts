import { add } from 'date-fns';
import { PopupConfirmComponent } from 'src/app/shared/components/popups/popup-confirm/popup-confirm.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoomTypeService } from './../../../../shared/services/room-type.service';
import {
  FileService,
  FileUploadController,
} from './../../../../shared/services/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationService } from './../../../../shared/services/accommodation.service';
import { RoomTypeModel } from './../../../../shared/models/room-type/room-type.model';
import { RoomModel } from './../../../../shared/models/room/room.model';
import { Component, Input, OnInit } from '@angular/core';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import Utils from 'src/app/shared/helpers/utils.helper';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';
import { RoomAvailablePopupComponent } from 'src/app/shared/components/popups/room-available-popup/room-available-popup.component';

@Component({
  selector: 'app-accommodation-management-room',
  templateUrl: './accommodation-management-room.component.html',
  styleUrls: ['./accommodation-management-room.component.scss'],
})
export class AccommodationManagementRoomComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;
  typeForm: string;
  eTypeForm = ETypeForm;
  isSubmitted: false;
  loadingImage = false;
  indexOfImage: number;
  dataSource: RoomModel[] = [];
  dataSourceBackup: RoomModel[] = [];
  roomTypeList: RoomTypeModel[] = [];
  uploadController = [];
  imageShowPopupView: FileUploadController[];

  constructor(
    private accommodationService: AccommodationService,
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
    private roomTypeService: RoomTypeService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.typeForm = this.type;
    this.roomTypeService.getAllRoomType().subscribe((res) => {
      this.roomTypeList = res;
    });
    this.accommodationService.getRoomAccommodation(this.id).subscribe((res) => {
      this.dataSource = res;
      this.dataSourceBackup = [...this.dataSource];
      this.dataSource.forEach((item) => {
        item.uploadController = { fileUrl: item.image };
      });
    });
  }

  submit(): void {
    const doSubmit = () => {
      // this.isSubmitted = true;
      // if (this.validateList()) {
      this.accommodationService
        .updateRoomAccommodation(this.mapData(), this.id)
        .subscribe((_) => {
          this.notification.success(
            'cập nhật thông tin thành công!',
            '',
            Utils.setStyleNotification()
          );
          this.typeForm = this.eTypeForm.view;
        });
      // }
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

  mapData(): any {
    return this.dataSource?.map((item) => {
      return {
        roomID: item.roomID,
        name: item.name,
        roomType: item.roomType,
        maximumPeople: +item.maximumPeople,
        availableQty: +item.availableQty,
        purchasedQty: +item.purchasedQty,
        bookedQty: item.bookedQty,
        price: item.price,
        no: item.no,
        description: item.description,
        image: item.uploadController.fileUrl,
      };
    });
  }

  edit(): void {
    this.typeForm = this.eTypeForm.edit;
    this.dataSourceBackup = [
      ...this.dataSource.map((item) => {
        return { ...item };
      }),
    ];
  }

  cancel(): void {
    this.typeForm = this.eTypeForm.view;
    this.dataSourceBackup = [
      ...this.dataSource.map((item) => {
        return { ...item };
      }),
    ];
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

  handleChange(info: { file: NzUploadFile }, item: RoomModel): void {
    switch (info.file.status) {
      case 'uploading':
        this.loadingImage = true;
        break;
      case 'done':
        // Get this url from response in real world.
        // tslint:disable-next-line:no-non-null-assertion
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loadingImage = false;
          item.image = img;
          item.uploadController = this.uploadController.find(
            (o) => o?.file?.uid === info?.file?.uid
          );
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
    this.uploadController.push(uploadController);
  };

  viewFullScreenImage(imageUrlArray, indexOfImage): void {
    this.imageShowPopupView = [...imageUrlArray.map((item) => item)];
    this.indexOfImage = indexOfImage;
  }

  deleteImage(item: RoomModel, index: number): void {
    item.image = null;
    this.uploadController.splice(index, 1);
  }

  add(): void {
    (this.dataSource ?? []).push(new RoomModel());
  }

  delete(index: number): void {
    const modal = this.modalService.create({
      nzContent: PopupConfirmComponent,
      nzComponentParams: {
        vnContent: 'Bạn có muốn xóa loại phòng này?',
      },
      nzWidth: 620,
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        this.dataSource.splice(index, 1);
        this.uploadController.splice(index, 1);
      }
    });
  }

  validateList(): boolean {
    if (
      this.dataSource.every(
        (item) =>
          item &&
          item.name &&
          item.roomType &&
          item.purchasedQty &&
          item.image &&
          this.validateMaximumPeople(item) &&
          this.validateAvailableQty(item)
      )
    ) {
      return true;
    }
    return false;
  }

  validateMaximumPeople(item: RoomModel): boolean {
    if (item.maximumPeople > 0) {
      return true;
    }
    return false;
  }

  validateAvailableQty(item: RoomModel): boolean {
    if (+item.availableQty <= +item.purchasedQty) {
      return true;
    }
    return false;
  }

  openRoomAvailable(): void {
    this.modalService.create({
      nzContent: RoomAvailablePopupComponent,
      nzComponentParams: {
        accommodationId: this.id,
        roomId: null,
        fromDate: new Date(),
        toDate: add(new Date(), { months: 1 }),
      },
      nzWidth: 1000,
      nzFooter: null,
    });
  }

  compareRoomType = (o1: RoomTypeModel, o2: RoomTypeModel) =>
    o1 && o2 ? o1.roomTypeID === o2.roomTypeID : o1 === o2;
}
