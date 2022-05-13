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
  isAnonymous = true;
  isSubmitted = false;
  date = null;
  @Input() id: string;
  booking = new BookingModel();
  accommodation = new AccommodationModel();
  roomAccommodation: RoomModel[] = [];
  roomTypeList: RoomTypeModel[] = [];
  utilityList: {
    utilityID: string;
    utilityType: string;
    isPrivate: boolean;
  }[] = [];
  iconUtilityListChecked: IconUtility[] = [];
  iconUtilityListDisabled: IconUtility[] = [];
  iconUtilityList: IconUtility[] = [];
  photoUpload = [];
  form: FormGroup;
  uploadController = [];
  isCreate = false;

  constructor(
    private imageService: NzImageService,
    private router: Router,
    private accommodationService: AccommodationService,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'].includes('?')
      ? this.route.snapshot.params['id'].split('?')[0]
      : this.route.snapshot.params['id'];
    this.getIcon();
    this.createForm();
    this.updateCheckIn();
    if (this.id) {
      forkJoin(
        this.accommodationService.detailAccommodation(this.id),
        this.accommodationService.getRoomAccommodation(this.id),
        this.accommodationService.getUtilityAccommodation(this.id)
      ).subscribe(([res1, res2, res3]) => {
        this.accommodation = res1;
        this.form.get('accommodation').patchValue(res1);
        this.roomAccommodation = res2;
        this.utilityList = res3;
        this.iconUtilityList.forEach((item) => {
          const icon = res3.find((x) => x.utilityType === item.value);
          if (icon) {
            item.checked = true;
            item.isPrivate = icon.isPrivate ?? false;
          } else {
            item.checked = false;
          }
        });
        this.iconUtilityListChecked = this.iconUtilityList.filter(
          (item) => item.checked
        );
        this.iconUtilityListDisabled = this.iconUtilityList.filter(
          (item) => !item.checked
        );
        this.accommodation.address = res1.address.concat(
          ', ',
          res1.subDistrict.name,
          ', ',
          res1.district.name,
          ', ',
          res1.province.name
        );
        this.accommodation.images.forEach((o) => {
          this.photoUpload.push(o.image);
        });
      });
    }
  }

  createForm(): void {
    this.form = this.fb.group(
      {
        no: null,
        // qty: [null, [CustomValidator.required, CustomValidator.requiredNumber]],
        fromDate: [null, [CustomValidator.required]],
        toDate: [null, CustomValidator.required],
        // totalDay: [{ value: null, disabled: true }],
        checkInName: [null, CustomValidator.required],
        checkInEmail: [null, [CustomValidator.required, CustomValidator.email]],
        checkInNote: null,
        checkInIdentityCard: [null, CustomValidator.required],
        checkInPhoneNumber: [
          null,
          [CustomValidator.required, CustomValidator.phoneNumber],
        ],
        // totalPrice: ['', CustomValidator.required],
        // childNumber: [0, CustomValidator.required],
        // personNumber: [
        //   null,
        //   [CustomValidator.required, CustomValidator.requiredNumber],
        // ],
        accommodation: [null, CustomValidator.required],
        // room: [null, CustomValidator.required],
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
          this.form
            .get('checkInPhoneNumber')
            .patchValue(res?.phoneNumber ?? '');
          this.form
            .get('checkInIdentityCard')
            .patchValue(res?.identityCard ?? '');
          this.form.get('checkInEmail').patchValue(res?.email ?? '');
        });
    }
  }

  onClick(): void {
    this.isCreate = true;
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
      const doSubmit = () => {
        this.booking = this.form?.getRawValue(); 
        // if (this.form.valid) {
        // this.booking = this.form.getRawValue();
        // }
      };
      // const uploadProgresses = [];
      // for (const item of this.uploadController) {
      //   if (
      //     item &&
      //     item.uploadController &&
      //     !item.uploadController.id &&
      //     item.uploadController.progress
      //   ) {
      //     uploadProgresses.push(item.uploadController.progress);
      //   }
      // }
      // if ((uploadProgresses ?? []).length < 0) {
      //   Promise.all(uploadProgresses).then(doSubmit);
      // } else {
      //   doSubmit();
      // }
    }
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

  onChange(result: Date): void {
    console.log('onChange: ', result);
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
}
