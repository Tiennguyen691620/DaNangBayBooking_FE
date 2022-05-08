import { CustomerFilterModel } from './../models/customer/customer-filter.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CustomerModel } from '../models/customer/customer.model';
import Utils from '../helpers/utils.helper';
import { map } from 'rxjs/operators';
import { PaginationModel } from '../models/master-data/pagination.model';
import DateTimeConvertHelper from '../helpers/datetime-convert.helper';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  filterCustomer(
    pageNumber: number,
    pageSize: number,
    params: CustomerFilterModel
  ): Observable<PaginationModel<CustomerModel>> {
    const paramsFilter = { ...params };
    if (!paramsFilter.searchKey) {
      delete paramsFilter.searchKey;
    }
    if (!paramsFilter.roleID) {
      delete paramsFilter.roleID;
    }
    const fileUrl = `api/Users/filter/customer?PageIndex=${pageNumber}&PageSize=${pageSize}`;
    return this.get(fileUrl, Utils.createFilterParam({ ...paramsFilter })).pipe(
      map((res: any) => {
        return {
          pageIndex: res.pageIndex,
          pageSize: res.pageSize,
          totalRecords: res.totalRecords,
          pageCount: res.pageCount,
          items: res.items.map((item: any, index: any) => {
            if(item.dob){
              item.dob = DateTimeConvertHelper.fromTimestampToDtObject(item.dob)
            }
            item.index = index + res.pageSize * res.pageIndex + 1;
            return item;
          }),
        };
      })
    );
  }

  getCustomer(id: string): Observable<CustomerModel> {
    const url = `api/Users/get-by-id/${id}`;
    return this.get(url).pipe(
      map((result: any) => {
        if (!result) {
          return new CustomerModel();
        }
        result.dob = result.dob
          ? DateTimeConvertHelper.fromTimestampToDtObject(result.dob)
          : null;
        result.activeDate = result.activeDate
          ? DateTimeConvertHelper.fromTimestampToDtObject(result.activeDate)
          : null;
        return result;
      })
    );
  }

  updateCustomer(data: any): Observable<any> {
    const url = `api/Users/update`;
    return this.put(url, Utils.createFilterParam(data));
  }

  updateStatusClient(UserClientID: any, Status: boolean): Observable<any> {
    let url = '';
    url = `api/Users/update/${UserClientID}/status/client?isActive=${Status}`;
    return this.put(url, null);
  }
}
