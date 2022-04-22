import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-popup-notification',
  templateUrl: './popup-notification.component.html',
  styleUrls: ['./popup-notification.component.scss']
})
export class PopupNotificationComponent implements OnInit {

  @Input() title!: string;
  @Input() vnContent!: string;
  @Input() obBtnTitle = 'Đóng';
  @Input() urlCallBack!: string;

  constructor(private  modal: NzModalRef, private router: Router) { }

  ngOnInit(): void {
  }

  closePopupYes(): void {
    if(this.urlCallBack){
      this.router.navigate([this.urlCallBack]);
    }
    this.modal.destroy();
  }

}
