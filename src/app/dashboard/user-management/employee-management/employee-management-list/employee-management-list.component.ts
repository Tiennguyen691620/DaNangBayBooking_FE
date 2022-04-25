import { PopupConfirmComponent } from 'src/app/shared/components/popups/popup-confirm/popup-confirm.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { UserFilterModel } from '../../../../shared/models/user/user-filter.model';
import { UserModel } from '../../../../shared/models/user/user.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Utils from 'src/app/shared/helpers/utils.helper';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DictionaryItem } from 'src/app/shared/models/master-data/dictionary-item.model';
import { EUserStatus } from 'src/app/shared/enum/user/user-status.enum';

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
  statusList: DictionaryItem[] = [];
  eCustomerStatus = EUserStatus;

  constructor(
    private userService: UserService,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.searchTerm$.pipe(debounceTime(600)).subscribe((_) => {
      this.filterModel.searchKey = this.searchTerm$.value;
      this.pageIndex = 1;
      this.filter();
    });
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

  changeActive(Status: boolean, employee: UserModel): void {
    if (!employee) {
      return;
    }

    const type = Status ? 'kích hoạt lại' : 'vô hiệu hoá';
    const modal = this.modalService.create({
      nzContent: PopupConfirmComponent,
      nzComponentParams: {
        vnContent: `Bạn có thực sự muốn ${type} tài khoản này không?`,
      },
      nzFooter: null,
    });
    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        // const queryParams = { UserAdminID: employee?.id };
        this.userService.updateStatusAdmin(employee.id, Status).subscribe(
          (_) => {
            this.notification.success(
              `Đã ${type} tài khoản!`,
              '',
              Utils.setStyleNotification()
            );
            // this.filter(this.pageIndex);
          },
          (err) => {
            employee.status = !employee.status;
          }
        );
      }
      if (!result || !result?.data) {
        employee.status = !employee.status;
      }
    });
  }
}
