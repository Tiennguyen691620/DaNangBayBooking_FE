import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sign-up-notification-popup',
  templateUrl: './sign-up-notification-popup.component.html',
  styleUrls: ['./sign-up-notification-popup.component.scss']
})
export class SignUpNotificationPopupComponent implements OnInit {

  @Input() title: string;
  @Input() type: string;
  @Input() subTitle: string;
  @Input() content: string;
  @Input() btnTitle: string = 'Đồng ý';
  constructor(private modal: NzModalRef, private router: Router) { }

  ngOnInit(): void { }

  closePopupNo(): void {
    this.modal.destroy({ data: false });
  }

  closePopupYes(): void {
    this.modal.destroy({ data: true });
    this.router.navigate(['/home']);
  }

}
