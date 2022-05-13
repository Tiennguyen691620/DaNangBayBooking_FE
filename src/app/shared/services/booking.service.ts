import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
   }

   createBooking(data: any): Observable<any> {
     const url = `api/BookRoom/create/book-room`;
     return this.post(url, data);
   }
}
