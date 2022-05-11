import { PopupChangePasswordComponent } from './../popups/popup-change-password/popup-change-password.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from './../../services/user.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  fullName: string;
  avatarUrl: string;
  id: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private userService: UserService,
    private modalService: NzModalService,
  ) {}

  ngOnInit(): void {
    this.fullName = this.authService.getAuthenticationModel().fullName;
    this.userService.getUser(this.authService.getAuthenticationModel().id).subscribe((res) => {
        this.avatarUrl = res.avatar;
        this.id= res.id
    })
    this.authService.changeAvatar$.subscribe((data) => {
      this.avatarUrl = data;
    })
  }

  profile(): void {
    this.router.navigate(['dashboard/user-management/employee/view', this.id]);
  }

  changePassword(): void {
    this.modalService.create({
      nzContent: PopupChangePasswordComponent,
      nzCloseIcon: 'false',
      nzWidth: '1100px',
      nzFooter: null,
    })
  }

  logOut(): void {
    this.authService.logOut();
  }
}
