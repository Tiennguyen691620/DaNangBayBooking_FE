import { UserGroupModel } from './../../../../shared/models/user-group/user-group.model';
import { Component, OnInit } from '@angular/core';
import { UserGroupService } from 'src/app/shared/services/user-group.service';

@Component({
  selector: 'app-user-group-management-list',
  templateUrl: './user-group-management-list.component.html',
  styleUrls: ['./user-group-management-list.component.scss'],
})
export class UserGroupManagementListComponent implements OnInit {
  // pageIndex = 1;
  // pageSize = 10;
  // totalCount = 0;
  dataSource!: UserGroupModel[];

  constructor(private userGroupService: UserGroupService) {}

  ngOnInit(): void {
    this.listAll();
  }

  listAll(): void {
    this.userGroupService.getAll().subscribe(res => {
      this.dataSource = res;
    });
  }

  // filter(pageIndex?: number): void {}

  // onPageSizeChange(event: number): void {
  //   this.pageSize = event;
  //   this.pageIndex = 1;
  //   this.filter();
  // }

  // onPageIndexChange(event: number): void {
  //   this.filter(event);
  // }
}
