import { Component, Input, OnInit } from '@angular/core';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';

@Component({
  selector: 'app-accommodation-management-room',
  templateUrl: './accommodation-management-room.component.html',
  styleUrls: ['./accommodation-management-room.component.scss'],
})
export class AccommodationManagementRoomComponent implements OnInit {
  @Input() id!: string;
  @Input() type!: string;
  typeForm!: string;
  eTypeForm = ETypeForm;

  constructor() {}

  ngOnInit(): void {
    this.typeForm = this.type;
  }
}
