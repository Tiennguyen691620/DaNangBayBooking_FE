import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-popup-google-map',
  templateUrl: './popup-google-map.component.html',
  styleUrls: ['./popup-google-map.component.scss'],
})
export class PopupGoogleMapComponent implements OnInit {
  @Input() content: string;
  @Input() isCorrect: boolean;
  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {}

  cancel(): void {
    this.modal.destroy({ data: false });
  }
}
