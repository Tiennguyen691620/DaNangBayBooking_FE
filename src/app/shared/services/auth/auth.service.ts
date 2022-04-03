import { localStorageKey } from './../../../app.config';
import { Observable } from 'rxjs';
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
import { CryptoUtil } from '../../helpers/crypto.helper';
import { userModel } from '../../models/user.model';
import { AuthenticationModel } from '../../models/auth/authentication.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService implements CanActivate {
  constructor(private httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }

  public login(userNameOrEmail: string, password: string): Observable<any> {
    const hashPassword = CryptoUtil.hashMessage(password);
    const { timestamp, signature } = CryptoUtil.generateSignature(
      userNameOrEmail + password
    );

    return this.get<userModel>('/login', {
      userName: userNameOrEmail,
      password: hashPassword,
      timestamp,
      signature,
    });
  }

  public logout() {
    localStorage.removeItem(localStorageKey);
    this.router.navigate(['/auth']);
  }

  public getAuthenticationModel(): AuthenticationModel {
    if (!window.localStorage[localStorageKey]) {
      return null as any;
    }
    try {
      return JSON.parse(window.localStorage[localStorageKey]);
    } catch (error) {
      return null as any;
    }
  }

  public setAuthenticationModel(userModel: userModel): any {
    return (window.localStorage[localStorageKey] = JSON.stringify(AuthenticationModel));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    if(this.getAuthenticationModel()){
      return true;
    }
    this.router.navigate(['/auth'],{
      queryParams: {returnUrl: state.url}
    });
    return false;
  }
}
