
import { Component, OnInit } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { images } from 'src/app/shared/models/sliderImage.model';

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrls: ['./accommodation-detail.component.scss'],
})
export class AccommodationDetailComponent implements OnInit {
  date = null;
  imageList = images;
  constructor(private imageService: NzImageService) {}

  ngOnInit(): void {}

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
