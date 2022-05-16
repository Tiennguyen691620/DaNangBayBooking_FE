import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss'],
})
export class PopupConfirmComponent implements OnInit {
  @Input() title!: string;
  @Input() engTitle!: string;
  @Input() vnContent!: string;
  @Input() eContent!: string;
  @Input() okBtnTitle = 'ĐỒNG Ý';
  @Input() engOkBtnTitle = '(AGREE)';
  @Input() cancelBtnTitle = 'KHÔNG';
  @Input() engCancelBtnTitle = '(NOT AGREE)';
  @Input() urlCallBack?: string;

  constructor(private modal: NzModalRef, private router: Router) {}

  ngOnInit(): void {}

  closePopupNo(): void {
    this.modal.destroy({ data: false });
  }

  closePopupYes(): void {
    if (this.urlCallBack) {
      this.router.navigate([this.urlCallBack]);
    }
    this.modal.destroy({ data: true });
  }
}
