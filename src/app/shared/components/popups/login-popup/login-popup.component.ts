import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
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
    public authService: AuthService,
    private router: Router,
    private modal: NzModalRef
  ) {}

  ngOnInit(): void {
    this.formLogin();
  }

  formLogin(): void {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
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
    if (this.signInForm.valid) {
      this.authService
        .login(this.signInForm.value.email, this.signInForm.value.password)
        .subscribe(
          (res) => {
            this.authService.setAuthenticationModel(
              res.data as AuthenticationModel
            );
            if(res.data !== null){
              this.modal.destroy();
              this.router.navigate(['/home']);
            }
          }
          ,
          (err) => {}
        );
    }
  }

  handlePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
  }
}
