import { RateCommentModel } from './../../../shared/models/rate-comment/rate-comment.model';
import { RateCommentService } from './../../../shared/services/rate-comment.service';
import { PopupRoomAvailableComponent } from './../../../shared/components/popups/popup-room-available/popup-room-available.component';
import { RoomAvailable } from './../../../shared/models/accommodation/room-available.model';
import { RoomAvailableFilter } from './../../../shared/models/accommodation/room-available-filter.model';
import { AccommodationComponent } from './../accommodation.component';
import { LoginPopupComponent } from './../../../shared/components/popups/login-popup/login-popup.component';
import { PopupConfirmComponent } from './../../../shared/components/popups/popup-confirm/popup-confirm.component';
import { SignInComponent } from './../../../auth/sign-in/sign-in.component';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { CustomerService } from './../../../shared/services/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookingModel } from './../../../shared/models/booking/booking.model';
import { RoomModel } from './../../../shared/models/room/room.model';
import { AccommodationService } from './../../../shared/services/accommodation.service';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Directive,
  Input,
} from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { images } from 'src/app/shared/models/sliderImage.model';
import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { PopupGoogleMapComponent } from 'src/app/shared/components/popups/popup-google-map/popup-google-map.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { forkJoin } from 'rxjs';
import {
  IconUtility,
  IconUtilityList,
} from 'src/app/shared/constants/icon-utility';
import { RoomTypeModel } from 'src/app/shared/models/room-type/room-type.model';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import { ToDate } from 'src/app/shared/helpers/must-match.validator';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import Utils from 'src/app/shared/helpers/utils.helper';
import { SignupPopupComponent } from 'src/app/shared/components/popups/signup-popup/signup-popup.component';
import { formatDistance } from 'date-fns';

// @Directive({ selector: 'H4' })
// export class H4 {
//   @Input() id: string;
// }

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrls: ['./accommodation-detail.component.scss'],
})
export class AccommodationDetailComponent implements OnInit {
  @ViewChild('roomAvailable') roomAvailable: ElementRef;
  @ViewChild('utility') utility: ElementRef;
  @ViewChild('generalRule') generalRule: ElementRef;
  @ViewChild('search') search: ElementRef;
  @Input() id: string;
  isAnonymous = true;
  isSubmitted = false;
  current = 0;
  index = 'First-content';
  booking = new BookingModel();
  accommodation = new AccommodationModel();
  filterModel = new RoomAvailableFilter();
  roomAvailableList: RoomAvailable[] = [];
  roomAccommodation: RoomModel[] = [];
  roomTypeList: RoomTypeModel[] = [];
  rateCommentList: RateCommentModel[] = [];
  utilityList: {
    utilityID: string;
    utilityType: string;
    isPrivate: boolean;
  }[] = [];
  iconUtilityList: IconUtility[] = [];
  photoUpload = [];
  form: FormGroup;
  uploadController = [];
  isCreate = false;
  isDrawer = false;
  totalDayPass = 0;
  totalRoomPass = 0;
  qtyRateComment : {
    qty: number;
    point: number;
  }
  likes = 0;
  dislikes = 0;
  time = formatDistance(new Date(), new Date());
  arr: any[] = [];

  constructor(
    private imageService: NzImageService,
    private router: Router,
    private accommodationService: AccommodationService,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private authService: AuthService,
    private notification: NzNotificationService,
    private rateCommentService: RateCommentService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'].includes('?')
      ? this.route.snapshot.params['id'].split('?')[0]
      : this.route.snapshot.params['id'];
    this.filterModel.accommodationId = this.id;
    this.getIcon();
    this.createForm();
    this.form.get('qty').disable();
    this.updateCheckIn();
    if (this.id) {
      forkJoin(
        this.accommodationService.detailAccommodation(this.id),
        this.accommodationService.getUtilityAccommodation(this.id),
        this.accommodationService.getRoomAccommodation(this.id),
        this.rateCommentService.getAllQtyAndPointRateComment(this.id),
      ).subscribe(([res1, res2, res3, res4]) => {
        this.accommodation = res1;
        this.form.get('accommodation').patchValue(res1);
        this.roomAccommodation = res3;
        this.qtyRateComment = res4;
        this.utilityList = res2;
        this.iconUtilityList.forEach((item) => {
          const icon = res2.find((x) => x.utilityType === item.value);
          if (icon) {
            item.checked = true;
            item.isPrivate = icon.isPrivate ?? false;
          } else {
            item.checked = false;
          }
        });
        this.accommodation.address = `${res1.address}, ${res1.subDistrict.name}, ${res1.district.name}, ${res1.province.name}`;
        // this.accommodation.address = res1.address.concat(
        //   ', ',
        //   res1.subDistrict.name,
        //   ', ',
        //   res1.district.name,
        //   ', ',
        //   res1.province.name
        // );
        this.accommodation.images.forEach((o) => {
          this.photoUpload.push(o.image);
        });
      });
    }
  }

  // filterRoom(): void {
  //   const filter = {...this.filterModel};
  //   this.accommodationService.getRoomAvailable(filter).subscribe((res) => {
  //     this.roomAvailableList = res
  //     this.arr = this.roomAvailableList.filter((item) => {
  //       return this.arr.includes(item.id) ? '' : this.arr.push(item.id);
  //     });
  //     console.log("arr",this.arr);
  //   });
  // }

  createForm(): void {
    this.form = this.fb.group(
      {
        no: null,
        userId: null,
        qty: [null, [CustomValidator.required]],
        fromDate: [null, [CustomValidator.required]],
        toDate: [null, [CustomValidator.required]],
        totalDay: [{ value: null, disabled: true }],
        checkInName: [null, CustomValidator.required],
        checkInMail: [null, [CustomValidator.required, CustomValidator.email]],
        checkInNote: null,
        checkInIdentityCard: [null, CustomValidator.required],
        checkInPhoneNumber: [
          null,
          [CustomValidator.required, CustomValidator.phoneNumber],
        ],
        bookingUser: [null, CustomValidator.required],
        totalPrice: ['', CustomValidator.required],
        childNumber: [0, CustomValidator.required],
        personNumber: [
          1,
          [CustomValidator.required],
        ],
        accommodation: [null, CustomValidator.required],
        room: [null, CustomValidator.required],
      },
      {
        validator: ToDate(
          'fromDate',
          'toDate',
          'Ngày nhận phòng',
          'Ngày trả phòng'
        ),
      }
    );
  }

  updateCheckIn(): void {
    if (this.authService.getAuthenticationModel()) {
      this.isAnonymous = false;
    } else {
      this.isAnonymous = true;
    }
    if (!this.isAnonymous) {
      this.customerService
        .getCustomerDetail(this.authService.getAuthenticationModel()?.id)
        .subscribe((res) => {
          this.form.get('checkInName').patchValue(res?.fullName ?? '');
          this.form.get('bookingUser').patchValue(res?.fullName ?? '');
          this.form
            .get('checkInPhoneNumber')
            .patchValue(res?.phoneNumber ?? '');
          this.form
            .get('checkInIdentityCard')
            .patchValue(res?.identityCard ?? '');
          this.form.get('checkInMail').patchValue(res?.email ?? '');
          this.form.get('userId').patchValue(res?.id ?? '');
        });
    }
  }

  onClick(item: string): void {
    if (this.warningPersonNumber(item) == true || this.warningChildNumber(item) == true) {
      this.notification.warning(this.warningPersonNumber(item) == true ? 'Vượt quá số lượng người cho phòng đặt' : 'Vượt quá số lượng trẻ em', ' ' , Utils.setStyleNotification());
      this.goToRoomAvailable();
      return null;
    } else{
      this.roomAccommodation.forEach((result) => {
        if (result.roomID === item) {
          this.form.get('room').patchValue(result);
          this.form.get('totalPrice').patchValue(result.price * this.form.get('qty').value * this.form.get('totalDay').value
            );
        }
      })
      if (!this.authService.getAuthenticationModel()) {
        const modal = this.modalService.create({
          nzContent: PopupConfirmComponent,
          nzComponentParams: {
            vnContent: 'Vui lòng đăng nhập để đặt phòng',
          },
          nzFooter: null,
        });
        modal.afterClose.subscribe((res) => {
          if (res && res.data) {
            this.modalService.create({
              nzContent: LoginPopupComponent,
              nzCloseIcon: 'false',
              nzWidth: 400,
              nzFooter: null,
            });
          }
        });
      } else {
        if (!item) {
          return;
        }
        const doSubmit = () => {
          if(this.form.get('fromDate').value == null && this.form.get('toDate').value == null){
            this.goToSearch();
            this.notification.warning('Vui lòng chọn ngày nhận phòng và trả phòng', ' ', Utils.setStyleNotification());
            return;
          }
          if(this.form.get('qty').value === 0 || this.form.get('personNumber').value === 0){
            this.notification.warning( this.form.get('qty').value === 0 ?'Số lượng phòng phải lớn hơn 0': 'Số người lớn phải lớn hơn 0', ' ', Utils.setStyleNotification());
            return;
          }
          if (this.form.valid) {
            this.booking = this.form.getRawValue();
            this.current += 1;
            this.changeContent();
            console.log('test', this.form?.getRawValue());
          }
        };
        const uploadProgresses = [];
        for (const item of this?.uploadController) {
          if (
            item &&
            item.uploadController &&
            !item.uploadController.id &&
            item.uploadController.progress
          ) {
            uploadProgresses.push(item.uploadController.progress);
          }
        }
        if ((uploadProgresses ?? []).length < 0) {
          Promise.all(uploadProgresses).then(doSubmit);
        } else {
          doSubmit();
        }
      }

    }

    
  }

  validatorTotalDay(): boolean {
    const formValue = this.form.getRawValue();
    if (!formValue?.totalDay) {
      return true;
    }
    if (this.totalDayPass > 0 && formValue?.totalDay <= this.totalDayPass) {
      return true;
    }
    return false;
  }

  updateTotalDay(): void {
    const formValue = this.form.getRawValue();
    if (!formValue?.fromDate || !formValue?.toDate) {
      this.form.get('totalDay').patchValue('');
      return;
    }

    const diff = Math.floor(
      (formValue?.toDate.setHours(0, 0, 0, 0) -
        formValue?.fromDate.setHours(0, 0, 0, 0)) /
        86400000
    );
    if (diff <= 0) {
      this.form.get('totalDay').patchValue('');
    }
    if (diff > 0) {
      this.form.get('totalDay').patchValue(diff);
    }
  }

  warningTotalQty(): boolean {
    const formValue = this.form.getRawValue();
    if (!formValue || !formValue?.qty || !formValue?.room) {
      return false;
    }
    if (formValue?.qty <= formValue?.room?.availableQty) {
      return false;
    }
    return true;
  }

  warningPersonNumber(item: string): boolean {
    this.roomAccommodation.forEach((result) => {
      if (result.roomID === item) {
        this.form.get('room').patchValue(result);
      }
    })
    const formValue = this.form.getRawValue();
    if (
      !formValue || !formValue?.personNumber || !formValue.qty || !formValue.room
    ) {
      return false;
    }
    if (
      +formValue?.personNumber / +formValue.qty > +formValue.room?.maximumPeople
    ) {
      return true;
    }
    return false;
  }

  warningChildNumber(item: string): boolean {
    this.roomAccommodation.forEach((result) => {
      if (result.roomID === item) {
        this.form.get('room').patchValue(result);
      }
    });
    const formValue = this.form.getRawValue();
    if (!formValue || !formValue?.childNumber || !formValue?.qty || !formValue?.room) {
      return false;
    }
    if (+formValue?.childNumber > +formValue?.qty) {
      return true;
    }
    return false;
  }

  getIcon(): void {
    this.iconUtilityList = IconUtilityList;
  }

  isDisable(isSelected: boolean): boolean {
    return !isSelected;
  }

  viewMap(item: AccommodationModel): void {
    const isCorrect =
      item?.mapURL != null &&
      item?.mapURL.trim().startsWith('<iframe') &&
      item?.mapURL.trim().endsWith(`</iframe>`);
    const modal = this.modalService.create({
      nzContent: PopupGoogleMapComponent,
      nzComponentParams: {
        content: item?.mapURL,
        isCorrect,
      },
      nzFooter: null,
      nzWidth: isCorrect ? (window.innerWidth * 7) / 10 : 350,
    });

    modal.afterClose.subscribe((result) => {});
  }

  openRoomAvailable(): void {
    if (
      this.form.get('fromDate').value == null &&
      this.form.get('toDate').value == null
    ) {
      this.notification.warning(
        'Vui lòng nhập ngày để xem tình trạng phòng',
        '',
        Utils.setStyleNotification()
      );
      this.goToSearch();
    } else {
      const formValue = this.form.getRawValue();
      this.form.get('qty').enable();
      this.modalService.create({
        nzContent: PopupRoomAvailableComponent,
        nzComponentParams: {
          accommodationId: this.id,
          roomId: null,
          fromDate: formValue?.fromDate,
          toDate: formValue?.toDate,
        },
        nzWidth: 1000,
        nzFooter: null,
      });
    }
  }

  goToRoomAvailable() {
    this.roomAvailable.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
  goToUtility() {
    this.utility.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
  goToGeneralRule() {
    this.generalRule.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
  goToSearch() {
    if (this.form.invalid) {
      this.search.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }
  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }

  openDrawer(): void {
    this.rateCommentService.getAllRateComment(this.id).subscribe((res) => {
      if(res.length > 0){
        this.rateCommentList = res;
        this.isDrawer = true;
      } else {
        this.notification.info('Không có đánh giá nào của khách', '', Utils.setStyleNotification());
      }
    });
  }

  closeDrawer(): void {
    this.isDrawer = false;
  }
}
