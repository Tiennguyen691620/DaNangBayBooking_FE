import { RateCommentService } from './../../../shared/services/rate-comment.service';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { RoomModel } from 'src/app/shared/models/room/room.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EBookingStatus } from './../../../shared/emun/booking/booking-status.enum';
import { BookingService } from './../../../shared/services/booking.service';
import { BehaviorSubject } from 'rxjs';
import { BookingModel } from './../../../shared/models/booking/booking.model';
import { Component, Input, OnInit } from '@angular/core';
import { BookingFilter } from 'src/app/shared/models/booking/booking-filter.model';
import { debounceTime } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import Utils from 'src/app/shared/helpers/utils.helper';
import { CancelBookingPopupComponent } from 'src/app/shared/components/popups/cancel-booking-popup/cancel-booking-popup.component';
import { PopupAccommodationInfoComponent } from 'src/app/shared/components/popups/popup-accommodation-info/popup-accommodation-info.component';
import { PopupUtilityProvidedComponent } from 'src/app/shared/components/popups/popup-utility-provided/popup-utility-provided.component';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { PopupRoomAccommodationComponent } from 'src/app/shared/components/popups/popup-room-accommodation/popup-room-accommodation.component';
import { PopupRatecommentComponent } from 'src/app/shared/components/popups/popup-ratecomment/popup-ratecomment.component';

@Component({
  selector: 'app-booking-management-list',
  templateUrl: './booking-management-list.component.html',
  styleUrls: ['./booking-management-list.component.scss'],
})
export class BookingManagementListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  isDraw = false;
  eBookingStatus = EBookingStatus;
  dataSource: BookingModel[] = [];
  roomList: RoomModel[] = [];
  bookingModel = new BookingModel();
  filterModel = new BookingFilter();
  searchTerm$ = new BehaviorSubject<string>('');
  constructor(
    private bookingService: BookingService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private accommodationService: AccommodationService,
    private authService: AuthService,
    private rateCommentService: RateCommentService
  ) {}

  ngOnInit(): void {
    this.filterModel.userId = this.authService.getAuthenticationModel().id;
    this.searchTerm$.pipe(debounceTime(600)).subscribe((_) => {
      this.filterModel.searchKey = this.searchTerm$.value;
      this.pageIndex = 1;
      this.filter();
    });
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.bookingService
      .filterBooking(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((res) => {
        this.dataSource = res.items;
        this.totalCount = res.totalRecords;
        if (res.items && res.items.length == 0 && res.pageCount > 0) {
          this.filter(res.pageCount);
        }
      });
  }

  changPageSize(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filter();
  }

  changePageIndex(event: number): void {
    this.filter(event);
  }

  cancelBooking(id: string): void {
      const modal = this.modalService.create({
        nzContent: CancelBookingPopupComponent,
        nzComponentParams: {
          dataSource: this.dataSource.filter(x => x.bookRoomID == id),
        },
        nzWidth: 520,
        nzFooter: null,
        nzClosable: null,
      });
      modal.afterClose.subscribe((result) => {
        if (result && result.reason) {
          const params = {
            id,
            cancelReason: result.reason,
          };
          this.bookingService.cancelBooking(params).subscribe((_) => {
            this.notification.success(
              'Hủy đặt phòng thành công',
              '',
              Utils.setStyleNotification()
            );
            this.filter();
          });
        }
      });
  }

  rateComment(bookRoomId: string): void {
    if(!this.dataSource.find(x => x.bookRoomID == bookRoomId).checkComment === true)  {
      return null;
    } 
    else {
      const modal = this.modalService.create({
        nzContent: PopupRatecommentComponent,
        nzComponentParams: {},
        nzWidth: 500,
        nzFooter: null,
        nzClosable: null,
      });
      modal.afterClose.subscribe((result) => {
        if (result && result.description && result.rating) {
          const params = {
            bookRoomId,
            description: result.description,
            rating: result.rating,
            title: result.title,
          };
          this.rateCommentService.createRateComment(params).subscribe((_) => {
            this.notification.success(
              'Đánh giá thành công',
              '',
              Utils.setStyleNotification()
            );
            this.filter();
          });
        }
      });

    }
  }

  closeDraw(): void {
    this.isDraw = false;
  }

  openDraw(id: string): void {
    if (id) {
      this.bookingService.getBookingDetail(id).subscribe((res) => {
        this.bookingModel = res;
      });
      this.isDraw = true;
    }
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
              (item) =>
                item.roomID !== this.bookingModel?.bookRoomDetail?.room.roomID
            ),
          },
          nzWidth: 800,
          nzFooter: null,
        });
      });
  }
}
