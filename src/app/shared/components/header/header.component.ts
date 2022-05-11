import { SignupPopupComponent } from './../popups/signup-popup/signup-popup.component';
import { environment } from './../../../../environments/environment';
import { CustomerModel } from './../../models/customer/customer.model';
import { CustomerService } from './../../services/customer.service';
import { AuthService } from './../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LoginPopupComponent } from './../popups/login-popup/login-popup.component';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { windowCount } from 'rxjs/operators';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navbarfixed = false;
  customer = new CustomerModel();
  avatarUrl?: string;
  fullName: string;
  isShow = false;

  constructor(
    private modalService: NzModalService,
    private router: Router,
    public authService: AuthService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.fullName = this.authService.getAuthenticationModel()?.fullName;
    this.customerService
    .getCustomerDetail(this.authService.getAuthenticationModel()?.id)
    .subscribe((res) => {
      this.customer = res;
      this.avatarUrl = res.avatar;
    });
    this.authService.showName$.subscribe((data) => {
      this.fullName = data;
    });
    this.authService.changeImage$.subscribe((data) => {
      this.avatarUrl = data;
    });
  }

  login(): void {
    if (!this.authService.getAuthenticationModel()) {
      this.modalService.create({
        // nzTitle: 'Đăng nhập',
        nzContent: LoginPopupComponent,
        nzCloseIcon: 'false',
        nzWidth: 400,
        nzFooter: null,
      });
    }
    // this.authService.setShowName(this.fullName);
    // this.authService.setChangeImage(this.avatarUrl);
  }

  signup(): void {
    if (!this.authService.getAuthenticationModel()) {
      this.modalService.create({
        nzContent: SignupPopupComponent,
        nzCloseIcon: 'false',
        nzWidth: 1100,
        nzFooter: null,
      });
    }
  }

  logout(): void {
    this.authService.setShowLogin(false);
    this.authService.setChangeImage(null);
    this.authService.setShowName(null);
    this.authService.logOut();
    window.location.href = `${environment.FE_ENDPOINT}home`;
  }

  backToHome(): void {
    window.location.href = `${environment.FE_ENDPOINT}home`;
  }

  goToProfile(): void {
    this.router.navigate(['/dashboard/account/profile']);
  }
  goToChangePass(): void {
    this.router.navigate(['/dashboard/account/change-password']);
  }

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 0) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }
}
