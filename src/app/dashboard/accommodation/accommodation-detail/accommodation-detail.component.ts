import { Router } from '@angular/router';

import { Component, ElementRef, OnInit, ViewChild, Directive, Input } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { images } from 'src/app/shared/models/sliderImage.model';

@Directive({selector: 'H4'})
export class H4 { 
  @Input()  id: string;
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


  constructor(private imageService: NzImageService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  goToRoomAvailable(){
    this.roomAvailable.nativeElement.scrollIntoView({behavior: 'smooth', block: 'end',inline: "nearest"});
  }
  goToUtility(){
    this.utility.nativeElement.scrollIntoView({behavior: 'smooth', block: 'end',inline: "nearest"});
  }
  goToGeneralRule(){
    this.generalRule.nativeElement.scrollIntoView({behavior: 'smooth', block: 'end',inline: "nearest"});
  }
}
