import { UserFilterModel } from './../models/user/user-filter.model';
import { UserModel} from './../models/user/user.model';
import { PaginationModel } from './../models/master-data/pagination.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Utils from '../helpers/utils.helper';
import { map } from 'rxjs/operators';
import DateTimeConvertHelper from '../helpers/datetime-convert.helper';
import { EUserStatus } from '../enum/user/user-status.enum';


@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  filterUser(
    pageNumber: number,
    pageSize: number,
    params: UserFilterModel
  ): Observable<PaginationModel<UserModel>> {
    const paramsFilter = { ...params };
    if (!paramsFilter.searchKey) {
      delete paramsFilter.searchKey;
    }
    const fileUrl = `api/Users/filter/admin?PageIndex=${pageNumber}&PageSize=${pageSize}`;
    return this.get(fileUrl, Utils.createFilterParam({ ...paramsFilter })).pipe(
      map((res) => {
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
      })
    );
  }

  getUser(id: string): Observable<UserModel> {
    const url = `api/Users/get-by-id/${id}`;
    return this.get(url).pipe(
      map((result: any) => {
        if (!result) {
          return new UserModel();
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

  createOrUpdateUser(data: any): Observable<any> {
    let url = '';
    // if(data.id){
    //   url = `api/Users/update/admin`;
    //   return this.put(url, Utils.createFilterParam(data));
    // }
    // if(!data.id){
    //   delete data.id;
    // }
    url = `api/Users/create/admin`;
    return this.post(url, Utils.createFilterParam(data));
  }

  updateStatusAdmin(UserAdminID: any, Status: boolean): Observable<any> {
    let url = '';
    url = `api/Users/update/${UserAdminID}/status/admin?isActive=${Status}`;
    return this.put(url, null);
  }
}
