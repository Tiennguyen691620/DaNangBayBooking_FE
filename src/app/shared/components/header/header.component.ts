import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  profile(): void{
    this.router.navigate(['/dashboard/account-admin/account-profile']);
  }

  changePassword(): void{
    this.router.navigate(['/dashboard/account-admin/account-change-password']);
  }

}
