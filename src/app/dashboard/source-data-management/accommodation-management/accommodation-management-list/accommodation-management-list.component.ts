import { MasterDataService } from './../../../../shared/services/master-data.service';
import { AccommodationTypeModel } from './../../../../shared/models/accommodation/accommodation-type.model';
import { AccommodationService } from './../../../../shared/services/accommodation.service';
import { AccommodationModel } from './../../../../shared/models/accommodation/accommodation.model';
import { AccommodationFilterModel } from './../../../../shared/models/accommodation/accommodation-filter.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LocationModel } from 'src/app/shared/models/master-data/location.model';

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
    private masterDataService: MasterDataService) {

    }

  ngOnInit(): void {
    this.searchTerm$.pipe(debounceTime(600)).subscribe((_) => {
      this.filterModel.searchKey = this.searchTerm$.value;
      this.pageIndex = 1;
      this.filter();
    })
    this.accommodationService.getAllAccommodationType().subscribe((res) => {
      this.AccommodationTypeAll = res;
    })
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
}
