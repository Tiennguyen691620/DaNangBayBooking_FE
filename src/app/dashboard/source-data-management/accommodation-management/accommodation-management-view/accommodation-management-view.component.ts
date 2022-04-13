import { ETypeForm } from './../../../../shared/enum/type-form.enum';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodation-management-view',
  templateUrl: './accommodation-management-view.component.html',
  styleUrls: ['./accommodation-management-view.component.scss']
})
export class AccommodationManagementViewComponent implements OnInit {

  eTypeForm = ETypeForm
  id!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'].includes('?')
      ? this.route.snapshot.params['id'].split('?')[0]
      : this.route.snapshot.params['id'];
  }

}
