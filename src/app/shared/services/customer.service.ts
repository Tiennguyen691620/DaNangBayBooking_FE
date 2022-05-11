import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer/customer.model';
import DateTimeConvertHelper from '../helpers/datetime-convert.helper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  getCustomerDetail(userId: string): Observable<CustomerModel> {
    const url = `api/Users/get-by-id/${userId}`;
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
    return this.put(url, data);
  }

  changePassword(data: any): Observable<any> {
    if(data?.id){
      const url = `api/Users/change-password`;
      return this.put(url, data);
    }
    return null;
  }
}
