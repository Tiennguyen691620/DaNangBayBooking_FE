import { Component, OnInit } from '@angular/core';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';

@Component({
  selector: 'app-member-customer-edit',
  templateUrl: './member-customer-edit.component.html',
  styleUrls: ['./member-customer-edit.component.scss'],
})
export class MemberCustomerEditComponent implements OnInit {
  param!: string;
  eTypeForm = ETypeForm;

  constructor() {}

  ngOnInit(): void {}
}
