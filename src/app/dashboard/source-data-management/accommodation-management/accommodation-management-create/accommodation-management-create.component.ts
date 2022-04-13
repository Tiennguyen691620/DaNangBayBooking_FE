import { ETypeForm } from './../../../../shared/enum/type-form.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodation-management-create',
  templateUrl: './accommodation-management-create.component.html',
  styleUrls: ['./accommodation-management-create.component.scss']
})
export class AccommodationManagementCreateComponent implements OnInit {

  eTypeForm = ETypeForm;

  constructor() { }

  ngOnInit(): void {
  }

}
