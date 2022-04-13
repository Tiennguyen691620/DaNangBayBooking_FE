import { ETypeForm } from './../../../../shared/enum/type-form.enum';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodation-management-form',
  templateUrl: './accommodation-management-form.component.html',
  styleUrls: ['./accommodation-management-form.component.scss']
})
export class AccommodationManagementFormComponent implements OnInit {

  @Input() id!: string;
  @Input() type!: string;
  eTypeForm = ETypeForm;

  constructor() { }

  ngOnInit(): void {
  }

}
