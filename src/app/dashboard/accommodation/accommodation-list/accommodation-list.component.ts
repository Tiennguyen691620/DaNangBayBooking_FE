import { RateCommentService } from './../../../shared/services/rate-comment.service';
import {
  IconUtility,
  IconUtilityList,
} from 'src/app/shared/constants/icon-utility';
import { AccommodationTypeModel } from './../../../shared/models/accommodation/accommodation-type.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  checkedAccommodationType = true;
  checkedAccommodationUtility = true;
  pageIndex = 1;
  pageSize = 5;
  totalCount = 0;
  dataSource: AccommodationModel[] = [];
  accommodationType: AccommodationTypeModel[] = [];
  iconUtilityList: IconUtility[] = [];
  filterModel = new AccommodationFilterModel();
  searchTerm$ = new BehaviorSubject<string>('');
  tooltips = ['Tệ', 'Không tốt', 'Bình thường', 'Hoàn hảo', 'Tuyệt vời'];
  constructor(
    private accommodationService: AccommodationService,
    private modalService: NzModalService,
    private route: ActivatedRoute,
    private router: Router,
    private rateCommentService: RateCommentService
  ) {}

  ngOnInit(): void {
    this.getIcon();
    this.filterModel.searchKey =
      this.route.snapshot.queryParamMap.get('searchKey');
    this.filterModel.accommodationTypeID =
      this.route.snapshot.queryParamMap.get('type');
    this.filterModel.districtID =
      this.route.snapshot.queryParamMap.get('district');
    this.filter();
    this.accommodationService.getAllAccommodationType().subscribe((result) => {
      this.accommodationType = result;
    });
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
        result.items.forEach((item) => {
          const params = this.dataSource.find((x) => x.accommodationID == item.accommodationID);
          this.rateCommentService
          .getAllQtyAndPointRateComment(params.accommodationID)
          .subscribe((result) => {
                params.qty = result.qty;
                params.point = result.point;
                // params.text = params.point == 5 ? 'Tuyệt vời' : (params.point == 4 ? 'Hoàn hảo' : (params.point == 3 ? 'Bình thường' : (params.point == 2 ? 'Không tốt' : (params.point == 1 && params.qty !== 0 ? 'Tệ' : 'Chưa có đánh giá'))));
                this.textComment(params);
            });
        });
      });
  }

  textComment(item: AccommodationModel): void {
    switch (item.point) {
      case 5: {
        item.text = 'Hoàn hảo';
        break;
      }
      case 4: {
        item.text = 'Tuyệt vời';
        break;
      }
      case 3: {
        item.text = 'Bình thường';
        break;
      }
      case 2: {
        item.text = 'Không tốt';
        break;
      }
      case 1: {
        item.text = 'Tệ';
        break;
      }
      default: {
        item.text = 'Chưa có đánh giá';
        break;
      }
    }
  }

  getAll(): void {
    this.router.navigate(['/dashboard/accommodation/list']);
    this.filterModel.searchKey = '';
    this.filterModel.districtID = '';
    this.filterModel.provinceID = '';
    this.filter();
  }
  getSortDesc(): void {
    this.dataSource.sort((a, b) => {
      // console.log(b.point - a.point);
      return b.point - a.point;
    });
  }
  getSortAsc(): void {
    this.dataSource.sort((a, b) => {
      // console.log(a.point - b.point);
      return a.point - b.point;
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

  getIcon(): void {
    this.iconUtilityList = IconUtilityList;
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  changeActive(event: boolean, item: AccommodationTypeModel): void {
    if (event) {
      this.checkedAccommodationType = false;
      this.filterModel.accommodationTypeID = item.accommodationTypeID;
    } else {
      this.filterModel.accommodationTypeID = null;
    }
  }
}
