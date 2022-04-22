import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';

@Component({
  selector: 'app-accommodation-management-edit',
  templateUrl: './accommodation-management-edit.component.html',
  styleUrls: ['./accommodation-management-edit.component.scss'],
})
export class AccommodationManagementEditComponent implements OnInit {
  id!: string;
  eTypeForm = ETypeForm;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'].includes('?')
      ? this.route.snapshot.params['id'].split('?')[0]
      : this.route.snapshot.params['id'];
  }
}
