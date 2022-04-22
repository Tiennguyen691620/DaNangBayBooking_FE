import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/services/base.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseService {
  public cacheRole = [];
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    super(httpClient);
  }

  get role(): any {
    return this.cacheRole;
  }

  public loadUserRoles(): Observable<any> {
    const user = this.authService.getAuthenticationModel();
    if (!(user && user.id)) {
      return new Observable((observer) => {
        observer.next();
        observer.complete();
      });
    }
    return new Observable((observer) => {
      this.get(`api/Roles/get-all`).subscribe((data) => {
        this.cacheRole = [];
        console.log(this.cacheRole);
        observer.next();
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      })
    });
  }
}
