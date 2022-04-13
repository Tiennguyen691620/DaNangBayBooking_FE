
import { CustomerFilterModel } from './../models/customer/customer-filter.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CustomerModel } from '../models/customer/customer.model';
import Utils from '../helpers/utils.helper';
import { map } from 'rxjs/operators';
import { PaginationModel } from '../models/master-data/pagination.model';

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
    params: CustomerFilterModel,
  ): Observable<PaginationModel<CustomerModel>> {
     const paramsFilter = { ...params };
     if (!paramsFilter.searchKey) {
       delete paramsFilter.searchKey;
     }
     if (!paramsFilter.roleID) {
       delete paramsFilter.roleID;
     }
    const fileUrl = `api/Users/filter?PageIndex=${pageNumber}&PageSize=${pageSize}`;
    return this.get(fileUrl,Utils.createFilterParam({...paramsFilter})).pipe(map((res: any) => {
      return {
        pageIndex: res.pageIndex,
        pageSize: res.pageSize,
        totalRecords: res.totalRecords,
        pageCount: res.pageCount,
        items: res.items.map((item: any, index: any) => {
          item.index = index + res.pageSize * res.pageIndex + 1;
          return item;
        }),
      };
    }))
  }
}
