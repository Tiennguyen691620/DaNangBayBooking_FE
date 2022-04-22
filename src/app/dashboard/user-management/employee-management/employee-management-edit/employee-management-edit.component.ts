import { ActivatedRoute } from '@angular/router';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-management-edit',
  templateUrl: './employee-management-edit.component.html',
  styleUrls: ['./employee-management-edit.component.scss'],
})
export class EmployeeManagementEditComponent implements OnInit {
  id: string;
  eTypeForm = ETypeForm;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'].includes('?')
      ? this.route.snapshot.params['id'].split('?')
      : this.route.snapshot.params['id'];
  }
}
