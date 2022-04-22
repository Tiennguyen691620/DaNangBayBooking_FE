import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-exception403',
  templateUrl: './exception403.component.html',
  styleUrls: ['./exception403.component.scss']
})
export class Exception403Component implements OnInit {

  constructor(private router: Router, private authenticationService: AuthService) { }

  ngOnInit(): void {
  }

  backHome(): void{
    this.router.navigate(['/dashboard']);
  }

  logOut(): void{
    this.authenticationService.logOut();
    this.router.navigate(['/auth/sign-in'])
  }

}
