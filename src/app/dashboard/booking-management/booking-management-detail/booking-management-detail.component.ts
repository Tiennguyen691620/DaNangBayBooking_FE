import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-management-detail',
  templateUrl: './booking-management-detail.component.html',
  styleUrls: ['./booking-management-detail.component.scss']
})
export class BookingManagementDetailComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id.includes('?')
      ? this.route.snapshot.params.id.split('?')[0]
      : this.route.snapshot.params.id;
  }

}
