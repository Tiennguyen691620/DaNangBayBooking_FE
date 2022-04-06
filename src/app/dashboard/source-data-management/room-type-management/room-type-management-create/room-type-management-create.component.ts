import { ETypeForm } from './../../../../shared/enum/type-form.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-type-management-create',
  templateUrl: './room-type-management-create.component.html',
  styleUrls: ['./room-type-management-create.component.scss']
})
export class RoomTypeManagementCreateComponent implements OnInit {

  eTypeForm = ETypeForm;

  constructor() { }

  ngOnInit(): void {
  }

}
