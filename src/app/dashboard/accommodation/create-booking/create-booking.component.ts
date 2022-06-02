import { BookingService } from './../../../shared/services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { BookingModel } from './../../../shared/models/booking/booking.model';
import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { Form, FormGroup, Validators } from '@angular/forms';
import DateTimeConvertHelper from 'src/app/shared/helpers/datetime-convert.helper';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() detail: AccommodationModel = new AccommodationModel();
  @Input() booking: BookingModel = new BookingModel();
  @Input() form: FormGroup;
  @Input() index: string;
  @Input() current: number;
  @Output() pre = new EventEmitter();
  isShowModal = false;
  isShow = false;
  typeSelected: string;
  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private spinnerService: NgxSpinnerService
  ) {
    this.typeSelected = 'ball-fussion';
  }

  ngOnInit(): void {}

  previous(): void {
    this.current = this.current - 1;
    this.index = 'First-content';
    this.pre.emit(this.current);
  }

  submit(): void {
    this.spinnerService.show();
    const formInFo = this.form.getRawValue();
    const request = {
      no: '',
      userId: formInFo.userId,
      fromDate: DateTimeConvertHelper.fromDtObjectToTimestamp(
        formInFo.fromDate
      ),
      toDate: DateTimeConvertHelper.fromDtObjectToTimestamp(formInFo.toDate),
      totalDay: formInFo.totalDay,
      checkInName: formInFo.checkInName,
      checkInMail: formInFo.checkInMail,
      checkInNote: formInFo.checkInNote,
      checkInIdentityCard: formInFo.checkInIdentityCard,
      checkInPhoneNumber: formInFo.checkInPhoneNumber,
      bookingUser: formInFo.bookingUser,
      totalPrice: formInFo.totalPrice,
      qty: formInFo.qty,
      childNumber: formInFo.childNumber,
      personNumber: formInFo.personNumber,
      accommodation: formInFo.accommodation,
      room: formInFo.room,
    };
    // console.log('form', request);

    this.bookingService.createBooking(request).subscribe((res) => {
      this.openModal();
      this.spinnerService.hide();
    });
  }

  openModal(): void {
    this.isShowModal = true;
  }

  closeModal(): void {
    this.isShowModal = false;
    window.location.href = `${environment.FE_ENDPOINT}home`;
  }
}
