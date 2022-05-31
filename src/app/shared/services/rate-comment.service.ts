import { RateCommentModel } from './../models/rate-comment/rate-comment.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RateCommentService extends BaseService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
   }

  createRateComment(data: any): Observable<any>{
    const url = `api/RateComment/create`;
    return this.post(url, data);
  }

  getAllRateComment(id: string): Observable<RateCommentModel[]>{
    const url = `api/RateComment/get-all/?accommodationId=${id}`;
    return this.get(url);
  }

  getAllQtyAndPointRateComment(id: string): Observable<any>{
    const url = `api/RateComment/get-all/point/?accommodationId=${id}`;
    return this.get(url);
  }
}
