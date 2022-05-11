import { UserService } from './../../../services/user.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import { MustMatch } from 'src/app/shared/helpers/must-match.validator';

@Component({
  selector: 'app-popup-change-password',
  templateUrl: './popup-change-password.component.html',
  styleUrls: ['./popup-change-password.component.scss']
})
export class PopupChangePasswordComponent implements OnInit {

  changePassForm: FormGroup;
  isSubmitted = false

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.changePassForm = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required], CustomValidator.passwordULN],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  submitForm(): void {
    this.isSubmitted = true;
    if(this.changePassForm.valid){
      // this.userService.
    }
  }


}
