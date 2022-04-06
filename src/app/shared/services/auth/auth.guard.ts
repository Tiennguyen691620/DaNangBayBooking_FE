import { HttpClient } from '@angular/common/http';
import { BaseService } from './../base.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends BaseService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.getAuthenticationModel()) {
      return true;
    }
    this.router.navigate(['/auth'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
