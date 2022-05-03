import { Router } from '@angular/router';
import { LoginPopupComponent } from './../popups/login-popup/login-popup.component';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { windowCount } from 'rxjs/operators';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navbarfixed: boolean = false;

  constructor(private modalService: NzModalService, private router: Router) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 0) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }

  login(): void {
    this.modalService.create({
      // nzTitle: 'Đăng nhập',
      nzContent: LoginPopupComponent,
      nzCloseIcon: 'false',
      nzWidth: 400,
      nzFooter: null,
    });
  }

  signup(): void {
    this.router.navigate(['/auth/sign-up']);
  }

  backToHome(): void {
    this.router.navigate(['/home']);
  }
}

