import { ActivatedRoute } from '@angular/router';
import { PopupGoogleMapComponent } from './../../../shared/components/popups/popup-google-map/popup-google-map.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AccommodationService } from './../../../shared/services/accommodation.service';
import { HomeComponent } from './../../../home/home.component';
import { AccommodationFilterModel } from './../../../shared/models/accommodation/accommodation-filter.model';
import { Component, Input, OnInit } from '@angular/core';
import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss'],
})
export class AccommodationListComponent implements OnInit {
  date = null;
  checked = true;
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  dataSource: AccommodationModel[] = [];
  filterModel = new AccommodationFilterModel();
  searchTerm$ = new BehaviorSubject<string>('');
  constructor(
    private accommodationService: AccommodationService,
    private modalService: NzModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filterModel.searchKey =
      this.route.snapshot.queryParamMap.get('searchKey');
    this.filter();
    // this.searchTerm$.pipe(debounceTime(600)).subscribe((_) => {
    //   this.filterModel.searchKey = this.searchTerm$.value;
    //   this.pageIndex = 1;
    //   this.filter();
    // });
  }

  filter(pageIndex?: number): void {
    const filter = { ...this.filterModel };
    this.accommodationService
      .filter(pageIndex ? pageIndex : 1, this.pageSize, filter)
      .subscribe((result) => {
          this.dataSource = result.items;
          this.totalCount = result.totalRecords;
        if (result.items && result.items.length == 0 && result.pageCount > 0) {
          this.filter(result.pageCount);
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

  viewMap(item: AccommodationModel): void {
    const isCorrect =
      item?.mapURL != null &&
      item?.mapURL.trim().startsWith('<iframe') &&
      item?.mapURL.trim().endsWith(`</iframe>`);
    const modal = this.modalService.create({
      nzContent: PopupGoogleMapComponent,
      nzComponentParams: {
        content: item?.mapURL,
        isCorrect,
      },
      nzFooter: null,
      nzWidth: isCorrect ? (window.innerWidth * 7) / 10 : 350,
    });

    modal.afterClose.subscribe((result) => {});
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
