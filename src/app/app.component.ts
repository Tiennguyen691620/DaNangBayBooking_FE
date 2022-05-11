import { SpinnerService } from './shared/services/spinner.service';
import { Router } from '@angular/router';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'BOOKING';
  isShow = false;
  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.isShow = false;
    this.spinnerService.showSpinner.subscribe((value) => {
      this.isShow = value ? true : false;
      this.cd.detectChanges();
    });
  }
}
