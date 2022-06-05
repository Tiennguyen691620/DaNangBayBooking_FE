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
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTransButtonModule } from 'ng-zorro-antd/core/trans-button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
    PipesModule,
    ReactiveFormsModule,
    NzAffixModule,
    NzAlertModule,
    NzAnchorModule,
    NzAutocompleteModule,
    NzAvatarModule,
    NzBackTopModule,
    NzBadgeModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCalendarModule,
    NzCardModule,
    NzCarouselModule,
    NzCascaderModule,
    NzCheckboxModule,
    NzCollapseModule,
    NzCommentModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzDrawerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzFormModule,
    NzGridModule,
    NzI18nModule,
    NzIconModule,
    NzImageModule,
    NzInputModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzListModule,
    NzMentionModule,
    NzMenuModule,
    NzMessageModule,
    NzModalModule,
    NzNoAnimationModule,
    NzNotificationModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzProgressModule,
    NzRadioModule,
    NzRateModule,
    NzResultModule,
    NzSelectModule,
    NzSkeletonModule,
    NzSliderModule,
    NzSpinModule,
    NzStatisticModule,
    NzStepsModule,
    NzSwitchModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    NzTimePickerModule,
    NzTimelineModule,
    NzToolTipModule,
    NzTransButtonModule,
    NzTransferModule,
    NzTreeModule,
    NzTreeViewModule,
    NzTreeSelectModule,
    NzTypographyModule,
    NzUploadModule,
    NzWaveModule,
    NzResizableModule,
    NzPipesModule,
    CKEditorModule,
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
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PipesModule,
    ErrorTailorModule,
    CKEditorModule,
  ],
})
export class ComponentsModule {}
