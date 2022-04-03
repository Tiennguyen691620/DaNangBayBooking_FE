import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-management-list',
  templateUrl: './employee-management-list.component.html',
  styleUrls: ['./employee-management-list.component.scss'],
})
export class EmployeeManagementListComponent implements OnInit {
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
