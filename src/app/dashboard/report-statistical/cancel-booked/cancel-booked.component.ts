import { BookingModel } from './../../../shared/models/booking/booking.model';
import { BookingService } from './../../../shared/services/booking.service';
import { CancelBookingReportFilter } from './../../../shared/models/report/cancel-booking-report-filter.model';
import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { XLSXFile } from 'src/app/shared/utils/XLSX.file';

@Component({
  selector: 'app-cancel-booked',
  templateUrl: './cancel-booked.component.html',
  styleUrls: ['./cancel-booked.component.scss'],
})
export class CancelBookedComponent implements OnInit {
  pageSize = 10;
  pageIndex = 1;
  totalCount = 0;
  filterModel = new CancelBookingReportFilter();
  dataSource: BookingModel[] = [];
  accommodationList: AccommodationModel[] = [];
  isShow = false;
  constructor(
    private accommodationService: AccommodationService,
    private bookingService: BookingService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.accommodationService.getAllAccommodation().subscribe((res) => {
      this.accommodationList = res;
    });
  }

  filter(pageIndex?: number): void {
    this.isShow = true;
    const filter = { ...this.filterModel };
    this.bookingService
      .getBookingReport(pageIndex ? pageIndex : 1, this.pageSize, filter)
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

  export(pageIndex?: number): void {
    const borderTable = {
      top: {
        style: 'thin',
        color: '000000',
      },
      bottom: {
        style: 'thin',
        color: '000000',
      },
      left: {
        style: 'thin',
        color: '000000',
      },
      right: {
        style: 'thin',
        color: '000000',
      },
    };
    const filter = { ...this.filterModel };
    this.bookingService
      .getBookingReport(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((res) => {
        const dataExport = res.items.map((item, index) => {
          return {
            STT: {
              t: 'n',
              v: index + 1,
              s: {
                font: { bold: true },
                alignment: {
                  horizontal: 'center',
                },
                border: borderTable,
              },
            },

            'Cơ Sở lưu trú': {
              t: 's',
              v: item?.accommodation?.name,
              s: {
                border: borderTable,
              },
            },

            'Họ & tên': {
              t: 's',
              v: item?.checkInName,
              s: {
                border: borderTable,
              },
            },

            'Mã đặt phòng': {
              t: 's',
              v: item?.no ?? '',
              s: {
                border: borderTable,
              },
            },

            'Ngày đặt phòng': {
              t: 's',
              v: item?.bookingDate
                ? this.datePipe.transform(
                    (item?.bookingDate as any) * 1000,
                    'dd/MM/yyyy'
                  )
                : '',
              s: {
                border: borderTable,
              },
            },

            'Ngày nhận phòng': {
              t: 's',
              v: item?.fromDate
                ? this.datePipe.transform(
                    (item?.fromDate as any) * 1000,
                    'dd/MM/yyyy'
                  )
                : '',
              s: {
                border: borderTable,
              },
            },

            'Ngày trả phòng': {
              t: 's',
              v: item?.toDate
                ? this.datePipe.transform(
                    (item?.toDate as any) * 1000,
                    'dd/MM/yyyy'
                  )
                : '',
              s: {
                border: borderTable,
              },
            },

            'SL Người lớn': {
              t: 'n',
              v: item?.bookRoomDetail?.personNumber ?? 0,
              s: {
                border: borderTable,
              },
            },

            'SL Trẻ em': {
              t: 'n',
              v: item?.bookRoomDetail?.childNumber ?? 0,
              s: {
                border: borderTable,
              },
            },

            'Số đêm nghỉ': {
              t: 's',
              v: item?.totalDay,
              s: {
                border: borderTable,
              },
            },

            'Trạng thái': {
              t: 's',
              v:
                item?.status == 0
                  ? 'Đã tiếp nhận'
                  : (item?.status == 1
                      ? 'Đã xác nhận'
                      : item?.status == 2
                      ? 'Đã hủy'
                      : 'Đã đóng') ?? '',
              s: {
                border: borderTable,
                font: {
                  bold: true,
                  color: { rgb: 'ffffff' },
                },
                fill: this.checkStatusExcel(item?.status),
              },
            },

            'Ngày hủy': {
              t: 's',
              v: this.datePipe.transform(
                item?.bookRoomDetail?.cancelDate,
                'dd/MM/yyyy'
              ),
              s: {
                border: borderTable,
              },
            },

            'Ghi chú': {
              t: 's',
              v: item?.checkInNote ?? '',
              s: {
                border: borderTable,
              },
            },
          };
        });
        const headers = {
          STT: '',
          'Cơ Sở lưu trú': '',
          'Họ & tên': '',
          'Mã đặt phòng': '',
          'Ngày đặt phòng': '',
          'Ngày nhận phòng': '',
          'Ngày trả phòng': '',
          'SL Người lớn': '',
          'SL Trẻ em': '',
          'Số đêm nghỉ': '',
          'Trạng thái': '',
          'Ngày hủy': '',
          'Ghi chú': '',
        };
        XLSXFile.reportBookingCancel(
          headers,
          dataExport,
          'BÁO CÁO THỐNG KÊ LƯỢT KHÁCH ĐẶT HỦY PHÒNG',
          {
            bookingFromDate:
              this.datePipe.transform(
                this.filterModel?.bookingFromDate,
                'dd/MM/yyyy'
              ) ?? '',
            bookingToDate:
              this.datePipe.transform(
                this.filterModel?.bookingToDate,
                'dd/MM/yyyy'
              ) ?? '',
            checkInFromDate:
              this.datePipe.transform(
                this.filterModel?.checkInFromDate,
                'dd/MM/yyyy'
              ) ?? '',
            checkInToDate:
              this.datePipe.transform(
                this.filterModel?.checkInToDate,
                'dd/MM/yyyy'
              ) ?? '',
            accommodationId:
              this.accommodationList.find(
                (item) =>
                  item.accommodationID === this.filterModel.accommodationId
              )?.name ?? 'Tất cả',
            status:
              this.filterModel?.status == 0
                ? 'Đã tiếp nhận'
                : (this.filterModel?.status == 1
                    ? 'Đã xác nhận'
                    : this.filterModel?.status == 2
                    ? 'Đã hủy'
                    : this.filterModel?.status == 3
                    ? 'Đã đóng'
                    : 'Tất cả') ?? 'tất cả',
          }
        );
      });
  }

  checkStatusExcel(status: number): any {
    switch (status) {
      case 0: {
        return {
          fgColor: { rgb: '0872fc' },
        };
      }
      case 1: {
        return {
          fgColor: { rgb: '139a57' },
        };
      }
      case 2: {
        return {
          fgColor: { rgb: '585858' },
        };
      }
      case 3: {
        return {
          fgColor: { rgb: '989898' },
        };
      }
    }
  }

  onChangeBooking(result: any): void {
    this.filterModel.bookingFromDate = result[0];
    this.filterModel.bookingToDate = result[1];
    // this.filter();
  }

  onChangeCheckIn(result: any): void {
    this.filterModel.checkInFromDate = result[0];
    this.filterModel.checkInToDate = result[1];
    // this.filter();
  }
}
