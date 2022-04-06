import { Component, OnInit } from '@angular/core';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';

@Component({
  selector: 'app-member-customer-detail',
  templateUrl: './member-customer-detail.component.html',
  styleUrls: ['./member-customer-detail.component.scss'],
})
export class MemberCustomerDetailComponent implements OnInit {
  
  param!: string;
  eTypeForm = ETypeForm;

  constructor() {}

  ngOnInit(): void {}
}
