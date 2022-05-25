import { AccommodationTypeModel } from './../shared/models/accommodation/accommodation-type.model';
import { AccommodationFilterModel } from './../shared/models/accommodation/accommodation-filter.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { images, imagesForSlider } from '../shared/models/sliderImage.model';
import { AccommodationService } from '../shared/services/accommodation.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AccommodationModel } from '../shared/models/accommodation/accommodation.model';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  date = null;
  imageSliderList = imagesForSlider;
  imageList = images;
  pageIndex = 1;
  pageSize = 10;
  totalCount = 0;
  dataSource: AccommodationModel[] = [];
  accommodationType: AccommodationTypeModel[] = [];
  filterModel = new AccommodationFilterModel();
  searchTerm$ = new BehaviorSubject<string>('');
  isSearch = false;

  constructor(
    private accommodationService: AccommodationService,
    private modalService: NzModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accommodationService.getAllAccommodationType().subscribe((result) => {
      this.accommodationType = result;
    });
  }

  onClick(): void {
    this.router.navigate(['/dashboard/accommodation/list'], {
      queryParams: {
        searchKey: this.filterModel.searchKey,
        type: this.filterModel.accommodationTypeID,
      },
    });
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
}
