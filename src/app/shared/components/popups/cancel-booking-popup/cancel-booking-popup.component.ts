import { BookingModel } from './../../../models/booking/booking.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancel-booking-popup',
  templateUrl: './cancel-booking-popup.component.html',
  styleUrls: ['./cancel-booking-popup.component.scss']
})
export class CancelBookingPopupComponent implements OnInit {
  @Input() dataSource: BookingModel[] = []
  form: FormGroup;
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      reason: [null, Validators.required]
    });
  }

  acceptModal(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      this.modal.destroy({ reason: formValue?.reason });
    }
  }

  closeModal(): void {
    this.modal.destroy(null);
  }

}
