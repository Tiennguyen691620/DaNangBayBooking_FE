
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-management-form',
  templateUrl: './booking-management-form.component.html',
  styleUrls: ['./booking-management-form.component.scss']
})
export class BookingManagementFormComponent implements OnInit {
  @Input() id: string;
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  backToList(): void {
    this.location.back();
  }

}
