import { RoomTypeModel } from './../models/room-type/room-type.model';
import { PaginationModel } from '../models/master-data/pagination.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import Utils from '../helpers/utils.helper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomTypeService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  filterRoomType(
    pageNumber: number,
    pageSize: number,
    params: any
  ): Observable<PaginationModel<RoomTypeModel>> {
    const paramsFilter = { ...params };
    if (!paramsFilter.searchKey) {
      delete paramsFilter.searchKey;
    }
    const filterUrl = `api/RoomTypes/filter?PageIndex=${pageNumber}&PageSize=${pageSize}`;
    return this.get(
      filterUrl,
      Utils.createFilterParam({ ...paramsFilter })
    ).pipe(
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

  createRoomType(data: any): Observable<any>{
    let url ='';
    url = 'api/RoomTypes/create';
    return this.post(url, data);
  }
}
