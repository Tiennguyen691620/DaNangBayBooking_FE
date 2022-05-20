import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancel-booked',
  templateUrl: './cancel-booked.component.html',
  styleUrls: ['./cancel-booked.component.scss'],
})
export class CancelBookedComponent implements OnInit {
  pageSize = 10;
  pageIndex = 1;
  totalCount = 0;
  accommodationList: AccommodationModel[] = [];
  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.accommodationService.getAllAccommodation().subscribe((res) => {
      this.accommodationList = res;
    });
  }

  filter(pageIndex?: number): void {}

  onPageSizeChange(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filter();
  }

  onPageIndexChange(event: number): void {
    this.filter(event);
  }

  export(): void {
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

    // return {
    //   'STT': {
    //     t: 'n',
    //     v: index + 1,
    //     s: {
    //       font: { bold: true },
    //       alignment: {
    //         horizontal: 'center',
    //       },
    //       border: borderTable,
    //     },
    //   },
    //   'Cơ Sở lưu trú': {
    //     t: 's',
    //     v: ,
    //     s: {
    //       border: borderTable,
    //     },
    //   },
    //   'Tên khách hàng': {
    //     t: 's',
    //     v: ,
    //     s: {
    //       border: borderTable,
    //     },
    //   },
    // };

    const headers = {
      'STT': '',
      'Cơ Sở lưu trú': '',
      'Loại sản phẩm': '',
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
  }
}
