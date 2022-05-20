import { RoomAvailable } from '../../../models/accommodation/room-available.model';
import { RoomAvailableFilter } from '../../../models/accommodation/room-available-filter.model';
import { AccommodationService } from './../../../services/accommodation.service';
import { add } from 'date-fns';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-room-available-popup',
  templateUrl: './room-available-popup.component.html',
  styleUrls: ['./room-available-popup.component.scss']
})
export class RoomAvailablePopupComponent implements OnInit {

  @Input() accommodationId: string;
  @Input() roomId: string;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  dataSource: {
    roomAvailable: RoomAvailable,
    qtyPerDateList: { date: number, qty: number }[]
  }[] = [];
  filterModel = new RoomAvailableFilter();
  qtyPerDateList: { date: number, qty: number }[] = [];
  constructor(
    private modal: NzModalRef,
    private accommodationService: AccommodationService

  ) { }

  ngOnInit(): void {
    this.filterModel.accommodationId = this.accommodationId;
    this.filterModel.roomId = this.roomId;
    this.filterModel.fromDate = this.fromDate;
    this.filterModel.toDate = this.toDate;
    this.filter();
  }

  filter(): void {
    const filter = { ...this.filterModel };
    this.updateTotalDay(filter);
    if (!this.validatorFilter(filter)) {
      this.dataSource = [];
      return;
    }
    this.accommodationService.getRoomAvailable(filter).subscribe((res) => {
      this.dataSource = [];
      res.forEach((item) => {
        if (!this.dataSource.some((o) => o.roomAvailable?.id === item.id)) {
          this.dataSource.push({
            roomAvailable: item,
            qtyPerDateList: this.qtyPerDateList.map((o) => {
              return { ...o };
            }),
          });
          this.dataSource
            .find((o) => o.roomAvailable?.id === item.id)
            ?.qtyPerDateList?.forEach((i) => {
              if (i.date === item.dateAvailable * 1000) {
                i.qty = item.qty;
              }
            });
        } else {
          this.dataSource
            .find((o) => o.roomAvailable?.id === item.id)
            ?.qtyPerDateList?.forEach((i) => {
              if (i.date === item.dateAvailable * 1000) {
                i.qty = item.qty;
              }
            });
        }
      });
    });
  }

  validatorFilter(filter: RoomAvailableFilter): boolean {
    if (!filter || !filter?.accommodationId || !filter?.fromDate || !filter?.toDate
      || Math.floor((filter?.toDate.setHours(0, 0, 0, 0) - filter?.fromDate.setHours(0, 0, 0, 0)) / 86400000) < 0) {
      return false;
    }
    return true;
  }

  cancel(): void {
    this.modal.destroy(null);
  }

  updateTotalDay(filter: RoomAvailableFilter): void {
    this.qtyPerDateList = [];
    if (!filter?.fromDate || !filter?.toDate) {
      // this.form.get('totalDay').patchValue('');
      this.qtyPerDateList.push(null);
      return;
    }
    for (let n = 0; n <= Math.floor((filter?.toDate.setHours(0, 0, 0, 0) - filter?.fromDate.setHours(0, 0, 0, 0)) / 86400000); n++) {
      const date = add(filter?.fromDate, { days: n }).setHours(0, 0, 0, 0);
      this.qtyPerDateList.push({ date, qty: 0 });
    }
  }

  getWidthConfig(): any {
    const widthConfig = ['150px', '150px'];
    this.qtyPerDateList.forEach(o => widthConfig.push('100px'));
    widthConfig.push('auto');
    return widthConfig;
  }
}
