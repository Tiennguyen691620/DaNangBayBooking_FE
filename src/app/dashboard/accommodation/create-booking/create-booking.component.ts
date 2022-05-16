import { BookingService } from './../../../shared/services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { BookingModel } from './../../../shared/models/booking/booking.model';
import { Component, Input, OnInit } from '@angular/core';
import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { RoomModel } from 'src/app/shared/models/room/room.model';
import { FormGroup } from '@angular/forms';
import DateTimeConvertHelper from 'src/app/shared/helpers/datetime-convert.helper';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import { AccommodationComponent } from '../accommodation.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() detail: AccommodationModel = new AccommodationModel();
  @Input() booking: BookingModel = new BookingModel();
  @Input() form: FormGroup;
  isShowModal = false;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    // console.log(AccommodationComponent.test);
  }

  submit(): void {
    const formInFo = this.form.getRawValue();
    const request = {
      // id: formInFo.id,
      no: '',
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
      totalPrice: formInFo.totalPrice,
      qty: formInFo.qty,
      childNumber: formInFo.childNumber,
      personNumber: formInFo.personNumber,
      accommodation: formInFo.accommodation,
      room: formInFo.room,
    };
    console.log('form', request);

    this.bookingService.createBooking(request).subscribe((res) => {
      this.openModal();
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
