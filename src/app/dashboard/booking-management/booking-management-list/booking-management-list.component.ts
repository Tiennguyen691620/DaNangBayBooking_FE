import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BookingService } from './../../../shared/services/booking.service';
import { BookingFilter } from './../../../shared/models/booking/booking-filter.model';
import { BookingModel } from './../../../shared/models/booking/booking.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Utils from 'src/app/shared/helpers/utils.helper';
import { CancelBookingPopupComponent } from 'src/app/shared/components/popups/cancel-booking-popup/cancel-booking-popup.component';

@Component({
  selector: 'app-booking-management-list',
  templateUrl: './booking-management-list.component.html',
  styleUrls: ['./booking-management-list.component.scss'],
})
export class BookingManagementListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  dataSource: BookingModel[] = [];
  filterModel = new BookingFilter();
  searchTerm$ = new BehaviorSubject<string>('');
  constructor(
    private bookingService: BookingService,
    private modalService: NzModalService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
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

  onPageSizeChange(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filter();
  }

  onPageIndexChange(event: number): void {
    this.filter(event);
  }

  cancelBooking(id: string): void {
    const modal = this.modalService.create({
      nzContent: CancelBookingPopupComponent,
      nzComponentParams: {},
      nzWidth: 500,
      nzFooter: null,
      nzClosable: null,
    });
    modal.afterClose.subscribe((result) => {
      if (result && result.reason) {
        const params = {
          id,
          cancelReason: result.reason,
        };
        console.log(params);

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
}
