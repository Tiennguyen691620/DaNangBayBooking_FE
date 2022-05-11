import { RoomModel } from './../../../shared/models/room/room.model';
import { AccommodationService } from './../../../shared/services/accommodation.service';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Directive,
  Input,
} from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { images } from 'src/app/shared/models/sliderImage.model';
import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { PopupGoogleMapComponent } from 'src/app/shared/components/popups/popup-google-map/popup-google-map.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { forkJoin } from 'rxjs';
import { IconUtility, IconUtilityList } from 'src/app/shared/constants/icon-utility';
import { RoomTypeModel } from 'src/app/shared/models/room-type/room-type.model';

@Directive({ selector: 'H4' })
export class H4 {
  @Input() id: string;
}

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrls: ['./accommodation-detail.component.scss'],
})
export class AccommodationDetailComponent implements OnInit {
  @ViewChild('roomAvailable') roomAvailable: ElementRef;
  @ViewChild('utility') utility: ElementRef;
  @ViewChild('generalRule') generalRule: ElementRef;
  date = null;
  imageList = images;
  @Input() id: string;
  accommodation = new AccommodationModel();
  roomAccommodation: RoomModel[] = [];
  roomTypeList: RoomTypeModel[] = [];
  utilityList: {
    utilityID: string;
    utilityType: string;
    isPrivate: boolean;
  }[] = [];
  iconUtilityListChecked: IconUtility[] = [];
  iconUtilityListDisabled: IconUtility[] = [];
  iconUtilityList: IconUtility[] = [];
  photoUpload = [];

  constructor(
    private imageService: NzImageService,
    private router: Router,
    private accommodationService: AccommodationService,
    private route: ActivatedRoute,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'].includes('?')
      ? this.route.snapshot.params['id'].split('?')[0]
      : this.route.snapshot.params['id'];
    this.getIcon();
    if (this.id) {
      forkJoin(
        this.accommodationService.detailAccommodation(this.id),
        this.accommodationService.getRoomAccommodation(this.id),
        this.accommodationService.getUtilityAccommodation(this.id)
      ).subscribe(([res1, res2, res3]) => {
        this.accommodation = res1;
        this.roomAccommodation = res2;
        this.utilityList = res3;
        this.iconUtilityList.forEach((item) => {
          const icon = res3.find((x) => x.utilityType === item.value);
          if (icon) {
            item.checked = true;
            item.isPrivate = icon.isPrivate ?? false;
          } else {
            item.checked = false;
          }
        });
        this.iconUtilityListChecked = this.iconUtilityList.filter(
          (item) => item.checked
        );
        this.iconUtilityListDisabled = this.iconUtilityList.filter(
          (item) => !item.checked
        );
        this.accommodation.address = res1.address.concat(
          ', ',
          res1.subDistrict.name,
          ', ',
          res1.district.name,
          ', ',
          res1.province.name
        );
        this.accommodation.images.forEach((o) => {
          this.photoUpload.push(o.image);
        });
      });
    }
  }

  getIcon(): void {
    this.iconUtilityList = IconUtilityList;
  }

  isDisable(isSelected: boolean): boolean {
    return !isSelected;
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

  goToRoomAvailable() {
    this.roomAvailable.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
  goToUtility() {
    this.utility.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
  goToGeneralRule() {
    this.generalRule.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
}
