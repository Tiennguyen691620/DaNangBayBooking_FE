import { localStorageKey } from './../../../app.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../base.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CryptoUtil } from '../../helpers/crypto.helper';
import { userModel } from '../../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }

  // public login(userName: string, password: string): Observable<any> {
  //   const hashPassword = CryptoUtil.hashMessage(password);
  //   const { timestamp, signature } = CryptoUtil.generateSignature(
  //     userName + password
  //   );

  //   return this.get<userModel>('/login', {
  //     userName: userName,
  //     password: hashPassword,
  //     timestamp,
  //     signature,
  //   });
  // }
  // public login(username: string, password: string): Observable<any> {
  //   // const url = `${this.REST_API_SERVER}/manager/?username=${username}`;
  //   return this.get<userModel>(`/user`, {
  //     username: username,
  //     password: password,
  //   });
  // }
  public login(username: string, password: string): Observable<any> {
    const url = `http://localhost:3000/user`;
    return this.httpClient.get<userModel>(url, {
    });
  }

  public logout() {
    localStorage.removeItem(localStorageKey);
    this.router.navigate(['/sign-in']);
  }

  public getAuthenticationModel() {
    if (!window.localStorage[localStorageKey]) {
      return null;
    }
    try {
      return JSON.parse(window.localStorage[localStorageKey]);
    } catch (error) {
      return null;
    }
  }

  public setAuthenticationModel(userModel: userModel): any {
    return (window.localStorage[localStorageKey] = JSON.stringify(userModel));
  }
}
