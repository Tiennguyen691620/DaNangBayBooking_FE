import { RoomModel } from './../../../models/room/room.model';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploadController } from 'src/app/shared/services/file.service';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-popup-room-accommodation',
  templateUrl: './popup-room-accommodation.component.html',
  styleUrls: ['./popup-room-accommodation.component.scss'],
})
export class PopupRoomAccommodationComponent implements OnInit {
  @Input() dataSource: RoomModel[] = [];
  imageShowPopupView: FileUploadController[];
  indexOfImage: number;
  typeRoomCSLT: string;
  constructor(
    private accommodationService: AccommodationService,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.modal.destroy();
  }

  viewFullScreenImage(imageUrlArray, indexOfImage, index?: number): void {
    this.imageShowPopupView = [...imageUrlArray.map((item) => item)];
    this.indexOfImage = indexOfImage;
    this.typeRoomCSLT = this.dataSource[index]?.roomType?.name;
  }
  closeView(): void {
    this.imageShowPopupView = null;
  }
}
