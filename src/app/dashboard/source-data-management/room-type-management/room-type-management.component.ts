import { RoomTypeFilterModel } from './../../../shared/models/room-type/room-type-filter.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-type-management',
  templateUrl: './room-type-management.component.html',
  styleUrls: ['./room-type-management.component.scss'],
})
export class RoomTypeManagementComponent implements OnInit {
  static filterModel = new RoomTypeFilterModel();

  constructor() {}

  ngOnInit(): void {}
}
