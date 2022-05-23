import { SharedModule } from './shared/shared.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from'@angular/common/http'
import { ServicesModule } from './shared/services/services.module';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { DefaultInterceptor } from './shared/helpers/default.interceptor';
import { NzModalRef } from 'ng-zorro-antd/modal';

registerLocaleData(vi);

const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ServicesModule,
    SharedModule,
    // ErrorTailorModule.forRoot({
    //   errors: {
    //     useValue: {
    //       required: 'Trường này là bắt buộc',
    //       password:
    //         'Mật khẩu cần phải có ít nhất 8 ký tự, bao gồm ký tự chữ và số',
    //       mustMatch: 'Mật khẩu không khớp',
    //       email: 'Email không đúng định dạng',
    //       phoneNumber: 'Số điện thoại ít nhất phải có 10 số',
    //       abbreviationName: 'Tên viết tắt phải nhập 03 ký tự',
    //       requiredNumber: 'Nhập số lớn hơn 0',
    //       max: ({ max }) => `Nhập số nhỏ hơn hoặc bằng ${max} `,
    //       min: ({ min }) => `Nhập số lớn hơn ${min} `,
    //       maxlength: ({ requiredLength, actualLength }) =>
    //         `Tối đa ${requiredLength} ký tự`,
    //       minlength: ({ requiredLength, actualLength }) =>
    //         `Tối thiểu ${requiredLength} ký tự`,
    //       invalidAddress: (error) => `Address isn't valid`,
    //     },
    //   },
    // }),
  ],
  providers: [
    INTERCEPTOR_PROVIDES,
    // { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_I18N, useValue: vi_VN },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
