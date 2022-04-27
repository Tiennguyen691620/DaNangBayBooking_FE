import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from'@angular/common/http'
import { ServicesModule } from './shared/services/services.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultInterceptor } from './shared/helpers/default.interceptor';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { HomeComponent } from './home/home.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
// import { IvyCarouselModule } from 'angular-responsive-carousel/public-api';

registerLocaleData(en);

// const maskConfig: Partial<IConfig> = {
//   validation: false,
// };

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
    IvyCarouselModule
    // NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [
    INTERCEPTOR_PROVIDES,
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
