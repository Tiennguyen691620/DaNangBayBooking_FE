import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getCustomerDetail(userId: string): Observable<CustomerModel> {
    const url = `api/Users/get-by-id/${userId}`;
    return this.get(url);
  }
}
