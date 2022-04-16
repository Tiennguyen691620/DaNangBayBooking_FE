import { LocationModel } from './../models/master-data/location.model';
import { AccommodationTypeModel } from './../models/accommodation/accommodation-type.model';
import { AccommodationModel } from './../models/accommodation/accommodation.model';
import { AccommodationFilterModel } from './../models/accommodation/accommodation-filter.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationModel } from '../models/master-data/pagination.model';
import { Observable } from 'rxjs';
import Utils from '../helpers/utils.helper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccommodationService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  filter(
    pageNumber: number,
    pageSize: number,
    params: AccommodationFilterModel
  ): Observable<PaginationModel<AccommodationModel>> {
    const paramsFilter = { ...params };
    if (!paramsFilter.searchKey) {
      delete paramsFilter.searchKey;
    }
    if (!paramsFilter.accommodationTypeID) {
      delete paramsFilter.accommodationTypeID;
    }
    if (!paramsFilter.locationID) {
      delete paramsFilter.locationID;
    }
    const fileUrl = `api/Accommodation/filter?PageIndex=${pageNumber}&PageSize=${pageSize}`;
    return this.get(fileUrl, Utils.createFilterParam({ ...paramsFilter })).pipe(
      map((res: any) => {
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

  getAllAccommodationType(): Observable<AccommodationTypeModel[]>{
    const url = `api/Accommodation/get-all/accommodationType`;
    return this.get(url);
  }

  createOrUpdate(data: any): Observable<any>{
    let url = ''
    // if(data.id){
    //   return this.put('api/Accommodation/update', data);
    // }
    url = 'api/Accommodation/create'
    return this.post(url, data);
  }

  deleteAccommodation(data: string | any): Observable<any> {
    const url = `api/Accommodation/delete`;
    return this.delete(url, data);
  }

  detailAccommodation(id: string): Observable<AccommodationModel>{
    const url = `api/Accommodation/detail/${id}`;
    return this.get(url);
  }
}
