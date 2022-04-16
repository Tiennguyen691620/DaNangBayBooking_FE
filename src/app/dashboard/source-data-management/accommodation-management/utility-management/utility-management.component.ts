import { Component, Input, OnInit } from '@angular/core';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';

@Component({
  selector: 'app-utility-management',
  templateUrl: './utility-management.component.html',
  styleUrls: ['./utility-management.component.scss'],
})
export class UtilityManagementComponent implements OnInit {
  @Input() id!: string;
  @Input() type!: string;
  typeForm!: string;
  eTypeForm = ETypeForm;

  constructor() {}

  ngOnInit(): void {
    this.typeForm = this.type;
  }
}
