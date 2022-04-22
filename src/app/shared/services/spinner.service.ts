import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isGetNotify: boolean;
  constructor() {}
  public show(): void {
    this.showSpinner.next(true);
  }
  public hide(): void {
    this.showSpinner.next(false);
  }
}
