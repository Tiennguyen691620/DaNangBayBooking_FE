import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../models/responseData.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  get apiEndPoint(): string {
    return environment.API_ENDPOINT;
  }

  constructor(public http: HttpClient) {}

  public get<T>(url: string, params?: any, headers?: any): Observable<any> {
    return this.http
      .get(this.apiEndPoint + url, { params, headers })
      .pipe(map((result: ResponseData<T>) => result.data as T));
  }
  public post<T>(url: string, params?: any, headers?: any): Observable<any> {
    return this.http
      .post(this.apiEndPoint + url, { params, headers })
      .pipe(map((result: ResponseData<T>) => result.data as T));
  }
  public put<T>(url: string, params?: any, headers?: any): Observable<any> {
    return this.http
      .put(this.apiEndPoint + url, { params, headers })
      .pipe(map((result: ResponseData<T>) => result.data as T));
  }
  public path<T>(url: string, params?: any, headers?: any): Observable<any> {
    return this.http
      .patch(this.apiEndPoint + url, { params, headers })
      .pipe(map((result: ResponseData<T>) => result.data as T));
  }
  public delete<T>(url: string, params?: any, headers?: any): Observable<any> {
    return this.http
      .delete(this.apiEndPoint + url, { params, headers })
      .pipe(map((result: ResponseData<T>) => result.data as T));
  }
}
