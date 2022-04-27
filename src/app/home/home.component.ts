import { Component, OnInit } from '@angular/core';
import { images, imagesForSlider } from '../shared/models/sliderImage.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  date = null;  
  imageSliderList = imagesForSlider; 
  imageList = images;

  constructor() {}

  ngOnInit(): void {}

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
}
