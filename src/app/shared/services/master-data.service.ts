import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationModel } from '../models/master-data/location.model';

@Injectable({
  providedIn: 'root',
})
export class MasterDataService extends BaseService {
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  getProvince(): Observable<LocationModel[]> {
    const url = `api/MasterData/location/get-all/province`;
    return this.get(url);
  }
}
