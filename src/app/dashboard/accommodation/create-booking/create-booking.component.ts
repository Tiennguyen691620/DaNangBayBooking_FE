import { BookingService } from './../../../shared/services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { BookingModel } from './../../../shared/models/booking/booking.model';
import { Component, Input, OnInit } from '@angular/core';
import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { RoomModel } from 'src/app/shared/models/room/room.model';
import { FormGroup } from '@angular/forms';
import DateTimeConvertHelper from 'src/app/shared/helpers/datetime-convert.helper';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() detail: AccommodationModel = new AccommodationModel();
  @Input() room: RoomModel [] = []; 
  @Input() booking: BookingModel = new BookingModel();
  @Input() form: FormGroup;

  constructor(private route: ActivatedRoute, private bookingService: BookingService) {}

  ngOnInit(): void {
    // this.booking = this.route.snapshot.queryParamMap.get('booking');
    console.log(this.detail);
    console.log(this.room);
    console.log(this.booking);
  }

  submit():void {
    const formInFo = this.form.getRawValue();
    const request = {
      id: formInFo.id,
      no: '',
      fromDate: DateTimeConvertHelper.fromDtObjectToTimestamp(formInFo.fromDate),
      toDate: DateTimeConvertHelper.fromDtObjectToTimestamp(formInFo.toDate),
      checkInName: formInFo.checkInName,
      checkInMail: formInFo.checkInMail,
      checkInNote: formInFo.checkInNote,
      checkInIdentityCard: formInFo.checkInIdentityCard,
      checkInPhoneNumber: formInFo.checkInPhoneNumber,
      accommodation: formInFo.accommodation,
    }
    console.log('form',request);
    
    // this.bookingService.createBooking(request).subscribe((res) => {
    //   console.log('form',res);
    // })
  }
}
