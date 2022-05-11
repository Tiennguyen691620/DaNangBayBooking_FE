import { PopupResetPasswordComponent } from './../../../../shared/components/popups/popup-reset-password/popup-reset-password.component';

import { UserService } from './../../../../shared/services/user.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CustomerService } from './../../../../shared/services/customer.service';
import { CustomerFilterModel } from './../../../../shared/models/customer/customer-filter.model';
import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/shared/models/customer/customer.model';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user/user.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PopupConfirmComponent } from 'src/app/shared/components/popups/popup-confirm/popup-confirm.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import Utils from 'src/app/shared/helpers/utils.helper';

@Component({
  selector: 'app-member-customer-list',
  templateUrl: './member-customer-list.component.html',
  styleUrls: ['./member-customer-list.component.scss'],
})
export class MemberCustomerListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  dataSource: CustomerModel[] = [];
  filterModel = new CustomerFilterModel();
  searchTerm$ = new BehaviorSubject<string>('');

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private modalService: NzModalService,
    private notification: NzNotificationService
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
    this.customerService
      .filterCustomer(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((res) => {
        this.dataSource = res.items;
        this.totalCount = res.totalRecords;
        // this.pageIndex = res.pageIndex + 1;
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

  changeActive(Status: boolean, customer: CustomerModel): void {
    if (!customer) {
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
        this.customerService.updateStatusClient(customer.id, Status).subscribe(
          (_) => {
            this.notification.success(
              `Đã ${type} tài khoản!`,
              '',
              Utils.setStyleNotification()
            );
            // this.filter(this.pageIndex);
          },
          (err) => {
            customer.status = !customer.status;
          }
        );
      }
      if (!result || !result?.data) {
        customer.status = !customer.status;
      }
    });
  }

  resetPassword(CustomerId: string): void {
    const modal = this.modalService.create({
      nzContent: PopupConfirmComponent,
      nzComponentParams: {
        vnContent: `Bạn có thực sự muốn đặt lại mật khẩu cho tài khoản này không?`,
      },
      nzFooter: null,
    })

    modal.afterClose.subscribe((result) => {
      if(result && result.data) {
        const request = {id: CustomerId};
        this.customerService.resetPassword(request).subscribe((res) => {
          const modalReset = this.modalService.create({
            nzContent: PopupResetPasswordComponent,
            nzComponentParams: {
              password: res.data,
            },
            nzWidth: '500px',
            nzFooter: null,
          });
        })
      }
    })
  }
}
