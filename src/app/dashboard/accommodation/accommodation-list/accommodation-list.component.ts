import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss'],
})
export class AccommodationListComponent implements OnInit {
  date = null;
  checked = true;
  constructor() {}

  ngOnInit(): void {}

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
