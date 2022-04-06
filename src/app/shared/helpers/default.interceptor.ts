import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase,
  HttpResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError, shareReplay } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth/auth.service';
// import { AuthService } from '../services/auth.service';
// import { SpinnerService } from '../services/spinner.service';
// import Utils from './utils.helper';

const CODE_MESSAGES = {
  200: 'Máy chủ trả về thành công dữ liệu được yêu cầu.',
  201: 'Dữ liệu mới hoặc sửa đổi là thành công.',
  202: 'Một yêu cầu đã vào hàng đợi nền (tác vụ không đồng bộ).',
  204: 'Xóa dữ liệu thành công.',
  400: 'Yêu cầu được gửi có lỗi và máy chủ không thực hiện các thao tác để tạo hoặc sửa đổi dữ liệu.',
  401: 'Người dùng không có quyền (mã thông báo, tên người dùng, lỗi mật khẩu).',
  403: 'Người dùng được ủy quyền, nhưng truy cập bị cấm. ',
  404: 'Yêu cầu được gửi là cho một bản ghi không tồn tại và máy chủ không hoạt động.',
  406: 'Định dạng của yêu cầu không có sẵn.',
  410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không còn nữa.',
  422: 'Xảy ra lỗi xác nhận khi tạo một đối tượng.',
  500: 'Máy chủ có lỗi. Vui lòng kiểm tra máy chủ.',
  502: 'Lỗi cổng.',
  503: 'Dịch vụ không khả dụng, máy chủ tạm thời bị quá tải hoặc bảo trì.',
  504: 'Cổng đã hết thời gian.'
};
const CACHE_SIZE = 1;
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  public cacheErrData$: Observable<any[]> = new Observable();
  constructor(
    private injector: Injector,
    private authService: AuthService,
    // private spinnerService: SpinnerService,
    private http: HttpClient
  ) { }
  get errData(): any {
    if (!this.cacheErrData$) {
      this.cacheErrData$ = this.getErrData().pipe(shareReplay(CACHE_SIZE));
    }
    return this.cacheErrData$;
  }

  getErrData(): Observable<any> {
    return this.http.get('./assets/err/err.json');
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  private goTo(url: string): void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private checkStatus(ev: any): any {
    if (!ev) {
      // (ev instanceof HttpErrorResponse)
      return;
    }
    const err = (ev.body && ev.body.error) || (ev.error && ev.error.error);
    if (!err || ev.url.includes(`api/token/get`)) {
      return;
    } else {
      this.errData.subscribe( (errData: any) => {
        if (ev.status === 401 || err.code === 'USER_NOT_LOGIN_TO_SYSTEM')
          return;
        const itemErr = errData.find( (item: any) => item.code === err.code);
        // if (itemErr) {
        //   return this.notification.error(`${itemErr.text}`, ``, Utils.setStyleNotification());
        // }
        // this.notification.error(`Đã xảy ra lỗi`, ``, Utils.setStyleNotification());
      });
    }
  }

  private handleData(ev: HttpResponseBase, showSpinner: boolean): void {
    this.checkStatus(ev);
    if (showSpinner) {
      // this.spinnerService.hide();
    }
    switch (ev.status) {
      case 200:
        break;
      case 400:
        break;
      case 401:
        // this.authService.logOut();
        break;
      case 403:
      case 404:
      case 500:
        this.goTo(`/exception/${ev.status}`);
        break;
      default:
        break;
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let showSpinner = true;
    // if (
    //   (req.method.toLowerCase() === 'post' && req.url.includes('api/file')) ||
    //   (req.url.includes(`api/notification/filter`) &&
    //     this.spinnerService.isGetNotify)
    // ) {
    //   showSpinner = false;
    // }
    // if (showSpinner) {
    //   this.spinnerService.show();
    // }

    const url = req.url;
    const authenticationModel = this.authService.getAuthenticationModel();
    const token = authenticationModel ? authenticationModel.accessToken : '';
    const headers = {
      Authorization: `Bearer ${token}`,
    };
   const newReq = req.clone({ url, setHeaders: headers });

    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponseBase) {
          this.handleData(event, showSpinner);
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {
        this.handleData(err, showSpinner);
        return throwError(err);
      })
    );
  }
}
