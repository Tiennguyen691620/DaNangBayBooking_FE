import { CustomerModel } from 'src/app/shared/models/customer/customer.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ETypeForm } from 'src/app/shared/enum/type-form.enum';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';

// const phoneNumber = /^[0-9]{10,10}$/;
const identityCard = /^[0-9]{10,10}$/;
const checkEmail =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const name =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]{1,50}$/;

@Component({
  selector: 'app-member-customer-form',
  templateUrl: './member-customer-form.component.html',
  styleUrls: ['./member-customer-form.component.scss'],
})
export class MemberCustomerFormComponent implements OnInit {
  @Input() type!: string;
  @Input() id!: string;

  // id!: string;
  // type!: string;
  eTypeForm = ETypeForm;
  typeForm!: string;
  avatarUrl?: string;
  avatarUrlBackup?: string;
  customerForm!: FormGroup;
  customerBackup = new CustomerModel();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      if (!queryParams?.tab) {
        this.router.navigate(['.'], {
          relativeTo: this.route,
          queryParams: { tab: 'one' },
          queryParamsHandling: 'merge',
        });
      }
    });
    this.createForm();
    this.typeForm = this.route.snapshot.queryParams.get('typeForm');
    if (this.typeForm !== this.eTypeForm.create) {
      this.id = this.route.snapshot.params.id.includes('?')
        ? this.route.snapshot.params.id.split('?')[0]
        : this.route.snapshot.params.id;
    }
  }

  createForm(): void {
    this.customerForm = this.fb.group({
      no: [null, [Validators.required]],
      name: [null, [Validators.required, Validators.pattern(name)]],
      phoneNumber: [
        null,
        [Validators.required, CustomValidator.phoneNumber],
      ],
      email: [
        null,
        [Validators.required, Validators.email],
      ],
      identityCard: [
        null,
        [Validators.required, Validators.pattern(identityCard)],
      ],
      identityCardPlace: [null],
      identityCardDate: [null],
      birthday: [null, Validators.required],
      gender: [null, Validators.required],
      province: [null, Validators.required],
      district: [null, Validators.required],
      ward: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  disabledBirthDate = (fromDate: Date): boolean => {
    return fromDate.setHours(0, 0, 0, 0) > new Date().setHours(23, 59, 59, 999);
  };

  submit(): void {
    if (this.customerForm.valid) {
      this.customerForm.getRawValue();
      console.log(this.customerForm.value);
    } else {
      Object.values(this.customerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateForm(): void {}

  cancel(): void {
    if (this.id && this.type === this.eTypeForm.edit) {
      this.type = this.eTypeForm.edit;
      this.customerForm.patchValue(this.customerBackup);
      this.avatarUrl = this.avatarUrlBackup;
      return;
    }
    if (this.id && this.type === this.eTypeForm.view) {
      this.router.navigate([
        'dashboard/customer-management/member-customer/list',
      ]);
    }
    if (!this.id) {
      this.router.navigate([
        'dashboard/customer-management/member-customer/list',
      ]);
    }
  }
}
