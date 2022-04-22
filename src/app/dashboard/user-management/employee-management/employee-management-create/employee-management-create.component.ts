import { ETypeForm } from 'src/app/shared/enum/type-form.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-management-create',
  templateUrl: './employee-management-create.component.html',
  styleUrls: ['./employee-management-create.component.scss']
})
export class EmployeeManagementCreateComponent implements OnInit {

  eTypeForm = ETypeForm;

  constructor() { }

  ngOnInit(): void {
  }

}
