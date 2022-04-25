import { Program } from './../../../../shared/models/program/program.model';
import { PopupConfirmComponent } from './../../../../shared/components/popups/popup-confirm/popup-confirm.component';
import { PopupNotificationComponent } from './../../../../shared/components/popups/popup-notification/popup-notification.component';
import { RoomTypeManagementComponent } from './../room-type-management.component';
import { RoomTypeModel } from './../../../../shared/models/room-type/room-type.model';
import { RoomTypeFilterModel } from './../../../../shared/models/room-type/room-type-filter.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoomTypeService } from 'src/app/shared/services/room-type.service';
import { debounceTime } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import Utils from 'src/app/shared/helpers/utils.helper';

@Component({
  selector: 'app-room-type-management-list',
  templateUrl: './room-type-management-list.component.html',
  styleUrls: ['./room-type-management-list.component.scss'],
})
export class RoomTypeManagementListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  filterModel = new RoomTypeFilterModel();
  dataSource: RoomTypeModel[] = [];
  searchTerm$ = new BehaviorSubject<string>('');

  constructor(
    private roomTypeService: RoomTypeService,
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
    RoomTypeManagementComponent.filterModel = filter;
    this.roomTypeService
      .filterRoomType(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((res) => {
        this.dataSource = res.items;
        this.totalCount = res.totalRecords;
        // this.pageIndex = res.pageIndex + 1;
        if (res.items && res.items.length === 0 && res.pageCount > 0) {
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

  deleteProgram(item: RoomTypeModel): void {
    if (!item) {
      this.modalService.create({
        nzContent: PopupNotificationComponent,
        nzComponentParams: {
          vnContent:
            'Bạn không thể xoá Loại phòng này vì loại phòng đã được sử dụng',
        },
        nzFooter: null,
      });
      return;
    }

    const modal = this.modalService.create({
      nzContent: PopupConfirmComponent,
      nzComponentParams: {
        vnContent: 'Bạn có muốn xoá loại phòng này không?',
      },
      nzFooter: null,
    });

    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        this.roomTypeService
          .deleteRoomType({ roomTypeID: item.roomTypeID })
          .subscribe((_) => {
            this.notification.success(
              'Xóa loại phòng thành công',
              '',
              Utils.setStyleNotification()
            );
            this.filter(this.pageIndex);
          });
      }
    });
  }
}
