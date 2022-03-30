import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';

@Component({
  selector: 'app-member-customer-create',
  templateUrl: './member-customer-create.component.html',
  styleUrls: ['./member-customer-create.component.scss'],
})
export class MemberCustomerCreateComponent implements OnInit {
  type!: string;
  eTypeForm = ETypeForm;
  typeForm!: string;
  avatarUrl?: string;
  avatarUrlBackup?: string;
  customerForm!: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.typeForm = this.route.snapshot.queryParams.get('typeForm');
  }

  createForm():void {
    this.customerForm = this.fb.group({
      no: [null, Validators.required],
      name: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      email: [null, CustomValidator.required, CustomValidator.email],
      identityCard: [null, Validators.required],
      identityCardPlace: null,
      IdentityCardDate: null,
      birthday: [null, Validators.required],
      gender: null,
      province: [null, Validators.required],
      district: [null, Validators.required],
      ward: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  disabledBirthDate = (fromDate: Date): boolean => {
    return fromDate.setHours(0, 0, 0, 0) > new Date().setHours(23, 59, 59, 999);
  };

  submit():void {
    this.customerForm.getRawValue();
    console.log(this.customerForm.value); 
  }
}
