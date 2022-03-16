import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          width: '80px',
        })
      ),
      state(
        'out',
        style({
          width: '270px',
        })
      ),
      transition('in => out', animate('0ms ease-in-out')),
      transition('out => in', animate('0ms ease-in-out')),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;

  constructor() {}

  ngOnInit(): void {}

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
