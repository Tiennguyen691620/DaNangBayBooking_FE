import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import Utils from 'src/app/shared/helpers/utils.helper';

@Component({
  selector: 'app-popup-reset-password',
  templateUrl: './popup-reset-password.component.html',
  styleUrls: ['./popup-reset-password.component.scss']
})
export class PopupResetPasswordComponent implements OnInit {

  @Input() password: string;
  constructor(
    private modal: NzModalRef,
    private notification: NzNotificationService) { }

  ngOnInit(): void { }

  closePopupNo(): void {
    this.modal.destroy({ data: false });
  }

  closePopupYes(event: MouseEvent): void {
    this.copyToClipboard(event);
    this.modal.destroy({ data: true });
  }

  copyToClipboard(event: MouseEvent): void {
    event.preventDefault();
    if (!this.password) {
      return;
    }
    const range = document.createRange();
    range.selectNodeContents(document.body);
    document.getSelection().addRange(range);
    const listener = (e: ClipboardEvent) => {
      const clipboard = e.clipboardData || window['clipboardData'];
      clipboard.setData('text', this.password.toString());
      e.preventDefault();
    };
    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);
    document.getSelection().removeAllRanges();
    this.notification.info('Đã sao chép mật khẩu!', '',
      Utils.setStyleNotification());
  }
}
