import { ViewportScroller } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit {
  title = 'BOOKING';
  pageYoffset = 0;
  isShow = false;

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(
    private scroll: ViewportScroller,
    private spinnerService: SpinnerService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.isShow = false;
    this.spinnerService.showSpinner.subscribe((show) => {
      this.isShow = show ? true : false;
      this.cd.detectChanges();
    });
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
}
