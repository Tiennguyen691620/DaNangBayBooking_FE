import { RoomAvailablePopupComponent } from './popups/room-available-popup/room-available-popup.component';
import { CancelBookingPopupComponent } from './popups/cancel-booking-popup/cancel-booking-popup.component';
import { PipesModule } from './../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PopupConfirmComponent } from './popups/popup-confirm/popup-confirm.component';
import { PopupNotificationComponent } from './popups/popup-notification/popup-notification.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { PopupGoogleMapComponent } from './popups/popup-google-map/popup-google-map.component';
import { PopupResetPasswordComponent } from './popups/popup-reset-password/popup-reset-password.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { PopupChangePasswordComponent } from './popups/popup-change-password/popup-change-password.component';
import { PopupAccommodationInfoComponent } from './popups/popup-accommodation-info/popup-accommodation-info.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { PopupUtilityProvidedComponent } from './popups/popup-utility-provided/popup-utility-provided.component';
import { PopupRoomAccommodationComponent } from './popups/popup-room-accommodation/popup-room-accommodation.component';

const options: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PopupConfirmComponent,
    PopupNotificationComponent,
    PopupGoogleMapComponent,
    PopupResetPasswordComponent,
    PopupChangePasswordComponent,
    CancelBookingPopupComponent,
    PopupAccommodationInfoComponent,
    PopupUtilityProvidedComponent,
    PopupRoomAccommodationComponent,
    RoomAvailablePopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    NgxMaskModule.forRoot(options),
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    CKEditorModule,
    NzTableModule,
    NzTabsModule,
    NzCheckboxModule,
    NzAvatarModule,
    NzDatePickerModule,
    NzImageModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Trường này là bắt buộc',
          password:
            'Mật khẩu cần phải có ít nhất 6 ký tự, bao gồm ký tự chữ và số',
          mustMatch: 'Mật khẩu không khớp',
          email: 'Email không đúng định dạng',
          phoneNumber: 'Số điện thoại ít nhất phải có 10 số',
          abbreviationName: 'Tên viết tắt phải nhập 03 ký tự',
          requiredNumber: 'Nhập số lớn hơn 0',
          toDate: ({ fromDateName, toDateName }) => {
            return `${toDateName} không được bé hơn hoặc bằng ${fromDateName}`;
          },
          maxDate: ({ maxDateError }) => `${maxDateError}`,
          max: ({ max }) => `Nhập số nhỏ hơn hoặc bằng ${max} `,
          min: ({ min }) => `Nhập số lớn hơn ${min} `,
          maxlength: ({ requiredLength, actualLength }) =>
            `Tối đa ${requiredLength} ký tự`,
          minlength: ({ requiredLength, actualLength }) =>
            `Tối thiểu ${requiredLength} ký tự`,
          invalidAddress: (error) => `Address isn't valid`,
        },
      },
    }),
    NzCheckboxModule,
    NzRadioModule,
    NzUploadModule,
    NzSelectModule,
    NzDrawerModule,
  ],
  exports: [HeaderComponent, FooterComponent, PipesModule, CKEditorModule],
})
export class ComponentsModule {}
