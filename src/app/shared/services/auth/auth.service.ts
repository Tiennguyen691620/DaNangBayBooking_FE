import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { localStorageKey } from './../../../app.config';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }
  showLoginSubject: Subject<boolean> = new Subject();
  showNameSubject: Subject<string> = new Subject();
  changeAvatarSubject: Subject<string> = new Subject();

  showLogin$ = this.showLoginSubject.asObservable();
  showName$ = this.showNameSubject.asObservable();
  changeAvatar$ = this.changeAvatarSubject.asObservable();

  setShowLogin(value: boolean) {
    this.showLoginSubject.next(value);
  }

  setShowName(value: string) {
    this.showNameSubject.next(value);
  }

  setChangeAvatar(value: string) {
    this.changeAvatarSubject.next(value);
  }

  public login(email: string, password: string): Observable<any> {
    // const hashPassword = CryptoUtil.hashMessage(password);
    // const { timestamp, signature } = CryptoUtil.generateSignature(
    //   email + password
    // );

    return this.post<AuthenticationModel>('api/Users/login-admin', {
      email: email,
      password: password,
      // timestamp,
      // signature,
    });
  }

  public logOut() {
    localStorage.removeItem(localStorageKey);
    this.router.navigate(['/auth']);
  }

  public getAuthenticationModel(): AuthenticationModel {
    if (!window.localStorage[localStorageKey]) {
      return null;
    }
    try {
      return JSON.parse(window.localStorage[localStorageKey]);
    } catch (error) {
      return null;
    }
  }

  public setAuthenticationModel(authenticationModel: AuthenticationModel): any {
    return (window.localStorage[localStorageKey] =
      JSON.stringify(authenticationModel));
  }
}
