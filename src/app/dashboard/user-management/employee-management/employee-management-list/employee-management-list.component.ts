import { Router } from '@angular/router';
import { UserService } from './../../../../shared/services/user.service';
import { UserFilterModel } from './../../../../shared/models/user/user-filter.model';
import { UserModel } from './../../../../shared/models/user/user.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-employee-management-list',
  templateUrl: './employee-management-list.component.html',
  styleUrls: ['./employee-management-list.component.scss'],
})
export class EmployeeManagementListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  dataSource: UserModel[] = [];
  filterModel = new UserFilterModel();
  searchTerm$ = new BehaviorSubject<string>('');

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.filter();
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.userService
      .filterUser(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((res) => {
        this.dataSource = res.items;
        this.totalCount = res.totalRecords;
        if (res.items && res.items.length == 0 && res.pageCount > 0) {
          this.filter(res.pageCount);
        }
      });
  }

  onPageSizeChange(event: number): void {
    this.pageSize = event;
    this.pageIndex = 1;
    this.filter();
  }

  onPageIndexChange(event: number): void {
    this.filter(event);
  }
}
