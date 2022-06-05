
import { CancelBookingReportFilter } from './../models/report/cancel-booking-report-filter.model';

import { BookingModel } from './../models/booking/booking.model';
import { PaginationModel } from './../models/master-data/pagination.model';
import { BookingFilter } from './../models/booking/booking-filter.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import Utils from '../helpers/utils.helper';
import { map } from 'rxjs/operators';
import DateTimeConvertHelper from '../helpers/datetime-convert.helper';

@Injectable({
  providedIn: 'root',
})
export class BookingService extends BaseService {
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  filterBooking(
    pageNumber: number,
    pageSize: number,
    params: BookingFilter
  ): Observable<PaginationModel<BookingModel>> {
    const paramsFilter = { ...params };
    if (!params.searchKey) {
      delete paramsFilter.searchKey;
    }
    if (!params.bookingFromDate) {
      delete paramsFilter.bookingFromDate;
    }
    if (!params.bookingToDate) {
      delete paramsFilter.bookingToDate;
    }
    if (!params.fromDate) {
      delete paramsFilter.fromDate;
    }
    if (!params.toDate) {
      delete paramsFilter.toDate;
    }
    if (!params.status) {
      delete paramsFilter.status;
    }
    const url = `api/BookRoom/filter?pageIndex=${pageNumber}&pageSize=${pageSize}`;
    return this.get(url, Utils.createFilterParam({ ...paramsFilter })).pipe(
      map((res: any) => {
        return {
          pageIndex: res.pageIndex,
          pageSize: res.pageSize,
          totalRecords: res.totalRecords,
          pageCount: res.pageCount,
          items: res.items.map((item: any, index: any) => {
            if (item?.bookingDate) {
              item.bookingDate = DateTimeConvertHelper.fromTimestampToDtObject(
                item?.bookingDate
              );
            }
            if (item?.fromDate) {
              item.fromDate = DateTimeConvertHelper.fromTimestampToDtObject(
                item?.fromDate
              );
            }
            if (item?.toDate) {
              item.toDate = DateTimeConvertHelper.fromTimestampToDtObject(
                item?.toDate
              );
            }
            item.index = index + res.pageSize * res.pageIndex + 1;
            return item;
          }),
        };
      })
    );
  }

  createBooking(data: any): Observable<any> {
    const url = `api/BookRoom/create`;
    return this.post(url, data);
  }

  cancelBooking(data: any): Observable<any> {
    const url = `api/BookRoom/cancel`;
    return this.post(url, data);
  }

  getBookingDetail(id: string): Observable<BookingModel> {
    const url = `api/BookRoom/detail/${id}`;
    return this.get(url).pipe(
      map((result: any) => {
        if (!result) {
          return new BookingModel();
        }
        result.bookingDate = result.bookingDate
          ? DateTimeConvertHelper.fromTimestampToDtObject(result.bookingDate)
          : null;
        result.fromDate = result.fromDate
          ? DateTimeConvertHelper.fromTimestampToDtObject(result.fromDate)
          : null;
        result.toDate = result.toDate
          ? DateTimeConvertHelper.fromTimestampToDtObject(result.toDate)
          : null;
        return result;
      })
    );
  }

  getBookingReport(params: CancelBookingReportFilter): Observable<BookingModel[]>{
    const url = `api/BookRoom/filter/report`;
    return this.get(url, Utils.createFilterParam({...params}));
  }
}
