
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { MasterDataService } from './../../../../shared/services/master-data.service';
import { AccommodationTypeModel } from './../../../../shared/models/accommodation/accommodation-type.model';
import { AccommodationService } from './../../../../shared/services/accommodation.service';
import { AccommodationModel } from './../../../../shared/models/accommodation/accommodation.model';
import { AccommodationFilterModel } from './../../../../shared/models/accommodation/accommodation-filter.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LocationModel } from 'src/app/shared/models/master-data/location.model';
import { PopupConfirmComponent } from 'src/app/shared/components/popups/popup-confirm/popup-confirm.component';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import Utils from 'src/app/shared/helpers/utils.helper';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-accommodation-management-list',
  templateUrl: './accommodation-management-list.component.html',
  styleUrls: ['./accommodation-management-list.component.scss'],
})
export class AccommodationManagementListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  filterModel = new AccommodationFilterModel();
  dataSource: AccommodationModel[] = [];
  AccommodationTypeAll!: AccommodationTypeModel[];
  Province: LocationModel[] = [];
  searchTerm$ = new BehaviorSubject<string>('');
  constructor(
    private accommodationService: AccommodationService,
    private masterDataService: MasterDataService,
    private router: Router,
    private notify: NzNotificationService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.searchTerm$.pipe(debounceTime(600)).subscribe((_) => {
      this.filterModel.searchKey = this.searchTerm$.value;
      this.pageIndex = 1;
      this.filter();
    });
    this.accommodationService.getAllAccommodationType().subscribe((res) => {
      this.AccommodationTypeAll = res;
    });
    this.masterDataService.getProvince().subscribe((res) => {
      this.Province = res;
    });
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.accommodationService
      .filter(pageIndex ? pageIndex : 1, this.pageSize, filter)
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

  deleteAccommodation(item: AccommodationModel): void {
    const modal = this.modalService.create({
      nzContent: PopupConfirmComponent,
      nzComponentParams: {
        vnContent: 'Bạn có chắc chắn muốn xóa cơ sở lưu trú này không ? ',
      },
      nzFooter: null,
    });
  
    modal.afterClose.subscribe((res) => {
      if(res && res.data){
        this.accommodationService.deleteAccommodation({id: item.accommodationID}).subscribe((_) => {
          this.notify.success('Xóa cơ sở lưu trú thành công', '', Utils.setStyleNotification());
          this.filter(this.pageIndex);
        })
      }
    });
  }
}
