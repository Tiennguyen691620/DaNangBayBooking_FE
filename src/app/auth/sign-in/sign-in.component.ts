import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
// import { error } from 'console';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  isSubmitted = false;
  passwordVisible = false;
  formErrors = {
    email: '',
    password: '',
  };

  invalidMessages: string[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.signInForm = this.fb.group({
      email: [null, [CustomValidator.required]],
      password: [null, [CustomValidator.required]],
    });
    this.signInForm.valueChanges.subscribe((data) => {
      this.onFormValueChanged();
    });
  }

  onFormValueChanged(): void {
    if (this.isSubmitted) {
      this.validateForm();
    }
  }

  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.signInForm,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
  }

  submitForm(): void {
    this.isSubmitted = true;
    if (this.signInForm.valid) {
      this.authService
        .login(this.signInForm.value.email, this.signInForm.value.password)
        .subscribe(
          (res) => {
            this.authService.setAuthenticationModel(
              res.data as AuthenticationModel
            );
            this.router.navigate(['/dashboard']);
          },
          (error) => {}
        );
    }
  }
  handlePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
  }
}
