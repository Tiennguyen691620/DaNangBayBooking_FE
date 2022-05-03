import { localStorageKey } from './../../../app.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../base.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CryptoUtil } from '../../helpers/crypto.helper';
import { AuthenticationModel } from '../../models/auth/authentication.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(private httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }

  public login(email: string, password: string): Observable<any> {
    return this.post<AuthenticationModel>('api/Users/login-client', {
      email: email,
      password: password,
    });
  }

  public logOut() {
    localStorage.removeItem(localStorageKey);
    this.router.navigate(['/home']);
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

  public setAuthenticationModel(authenticationModel: AuthenticationModel): any {
    return (window.localStorage[localStorageKey] =
      JSON.stringify(authenticationModel));
  }

  signIn(data: any): Observable<any> {
    const url = `api/Users/register-client`;
    return this.post(url, data);
  }
}
