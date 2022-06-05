import { PopupRoomAccommodationComponent } from './../../../shared/components/popups/popup-room-accommodation/popup-room-accommodation.component';
import { PopupUtilityProvidedComponent } from './../../../shared/components/popups/popup-utility-provided/popup-utility-provided.component';
import { PopupAccommodationInfoComponent } from './../../../shared/components/popups/popup-accommodation-info/popup-accommodation-info.component';
import { AccommodationService } from './../../../shared/services/accommodation.service';
import { RoomModel } from './../../../shared/models/room/room.model';
import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { BookingModel } from './../../../shared/models/booking/booking.model';
import { BookingService } from './../../../shared/services/booking.service';

import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-booking-management-form',
  templateUrl: './booking-management-form.component.html',
  styleUrls: ['./booking-management-form.component.scss'],
})
export class BookingManagementFormComponent implements OnInit {
  @Input() id: string;
  bookingModel = new BookingModel();
  accommodationList: AccommodationModel[] = [];
  roomList: RoomModel[] = [];
  constructor(
    private location: Location,
    private bookingService: BookingService,
    private accommodationService: AccommodationService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getBookingDetail();
  }

  getBookingDetail(): void {
    this.bookingService.getBookingDetail(this.id).subscribe((res) => {
      this.bookingModel = res;
      // this.accommodationService
      //   .getRoomAccommodation(this.bookingModel.accommodation.accommodationID)
      //   .subscribe((res) => {
      //     this.roomList = res;
      //   });
    });
  }

  viewAccommodation(id: string): void {
    const modal = this.modalService.create({
      nzContent: PopupAccommodationInfoComponent,
      nzComponentParams: {
        id,
      },
      nzWidth: 1000,
      nzFooter: null,
    });
  }

  viewUtilities(id: string): void {
    const modal = this.modalService.create({
      nzContent: PopupUtilityProvidedComponent,
      nzComponentParams: {
        id,
      },
      nzWidth: 1000,
      nzFooter: null,
    });
  }

  viewOtherEndow(): void {
    this.accommodationService
      .getRoomAccommodation(this.bookingModel.accommodation?.accommodationID)
      .subscribe((res) => {
        this.roomList = res;
        const modal = this.modalService.create({
          nzContent: PopupRoomAccommodationComponent,
          nzComponentParams: {
            dataSource: this.roomList.filter(
              (item) => item.roomID !== this.bookingModel?.bookRoomDetail?.room.roomID
            ),
          },
          nzWidth: 800,
          nzFooter: null,
        });
      });
  }

  backToList(): void {
    this.location.back();
  }
}
