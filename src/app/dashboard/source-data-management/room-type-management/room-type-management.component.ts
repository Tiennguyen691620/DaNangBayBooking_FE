import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-type-management',
  templateUrl: './room-type-management.component.html',
  styleUrls: ['./room-type-management.component.scss'],
})
export class RoomTypeManagementComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;

  constructor() {}

  ngOnInit(): void {}

  filter(pageIndex?: number): void {}

  onPageSizeChange(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filter();
  }

  onPageIndexChange(event: number): void {
    this.filter(event);
  }
}
