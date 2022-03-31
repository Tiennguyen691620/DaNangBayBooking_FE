import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss'],
})
export class AccountProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  createForm(): void {
    this.profileForm = this.fb.group({
      no: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phoneNumber: ['', Validators.required],
      email: [
        '',
        CustomValidator.required,
        CustomValidator.email,
        Validators.pattern(/^([a-z0-9]+)([@gmail.com]+){6,100}$/i),
      ],
      identityCard: ['', Validators.required],
      identityCardPlace: '',
      IdentityCardDate: '',
      birthday: ['', Validators.required],
      gender: '',
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
}
