import { UserGroupModel } from './../models/user-group/user-group.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGroupService extends BaseService {
  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  getAll(): Observable<UserGroupModel[]> {
    const url = `api/Roles/get-all`;
    return this.get(url);
  }
}
