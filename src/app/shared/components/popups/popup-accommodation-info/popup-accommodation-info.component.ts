import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploadController } from 'src/app/shared/services/file.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-popup-accommodation-info',
  templateUrl: './popup-accommodation-info.component.html',
  styleUrls: ['./popup-accommodation-info.component.scss'],
})
export class PopupAccommodationInfoComponent implements OnInit {
  @Input() id: string;
  isCorrectFormat = false;
  mapUrl: string;
  photoUpload = [];
  imageShowPopupView: FileUploadController[];
  indexOfImage: number;
  accommodation = new AccommodationModel();
  Editor = ClassicEditor;
  constructor(
    private modal: NzModalRef,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    this.accommodationService.detailAccommodation(this.id).subscribe((res) => {
      console.log('ress', res);
      this.accommodation = res;
      this.accommodation.images.forEach((o) => {
        this.photoUpload.push(o.image);
      });
      this.initMap();
    });
  }

  initMap(): void {
    if (!this.accommodation?.mapURL) {
      return;
    }
    const mapUrl = this.accommodation?.mapURL;
    this.isCorrectFormat =
      mapUrl &&
      mapUrl.length &&
      mapUrl.trim().startsWith('<iframe') &&
      mapUrl.trim().endsWith(`</iframe>`);
    this.mapUrl = mapUrl;
  }

  cancel(): void {
    this.modal.destroy();
  }

  viewFullScreenImage(imageUrlArray, indexOfImage): void {
    this.imageShowPopupView = [...imageUrlArray.map((item) => item)];
    this.indexOfImage = indexOfImage;
  }

  closeView(): void {
    this.imageShowPopupView = null;
  }
}
