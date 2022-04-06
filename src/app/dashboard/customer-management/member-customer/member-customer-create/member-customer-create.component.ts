import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';



@Component({
  selector: 'app-member-customer-create',
  templateUrl: './member-customer-create.component.html',
  styleUrls: ['./member-customer-create.component.scss'],
})
export class MemberCustomerCreateComponent implements OnInit {

  eTypeForm = ETypeForm;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  

  
}
