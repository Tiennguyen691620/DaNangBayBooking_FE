import { Component, HostListener, OnInit } from '@angular/core';
import { windowCount } from 'rxjs/operators';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navbarfixed: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 0) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }
}

