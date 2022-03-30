import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-customer-list',
  templateUrl: './member-customer-list.component.html',
  styleUrls: ['./member-customer-list.component.scss'],
})
export class MemberCustomerListComponent implements OnInit {
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
    this.filter(event)
  }
}
