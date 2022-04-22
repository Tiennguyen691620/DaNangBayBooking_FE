import { ActivatedRoute } from '@angular/router';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-management-view',
  templateUrl: './employee-management-view.component.html',
  styleUrls: ['./employee-management-view.component.scss']
})
export class EmployeeManagementViewComponent implements OnInit {

  id: string;
  eTypeForm = ETypeForm;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'].includes('?')
      ? this.route.snapshot.params['id'].split('?')
      : this.route.snapshot.params['id'];
  }

}
