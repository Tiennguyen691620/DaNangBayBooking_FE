import { getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { userModel } from 'src/app/shared/models/user.model';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
// import { error } from 'console';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  isSubmitted!: false;
  passwordVisible = false;

  invalidMessages!: string[];

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
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // remember: [true],
    });
    // this.signInForm.valueChanges.subscribe((data) => {
    //   this.onFormValueChanged();
    // });
  }

  // onFormValueChanged(): void {
  //   if (this.isSubmitted) {
  //     this.validateForm();
  //   }
  // }

  // validateForm(): void {
  //   this.invalidMessages = ValidationHelper.getInvalidMessages(
  //     this.signInForm,
  //     this.formErrors
  //   );
  //   return this.invalidMessages.length === 0;
  // }

  submitForm(): void {
    if(this.signInForm.valid){
    this.authService
      .login(this.signInForm.value.userName, this.signInForm.value.password)
      .subscribe(
        (res) => {
          const data = res;
          console.log('data', data);
          this.authService.setAuthenticationModel(data as AuthenticationModel);
          this.router.navigate(['/dashboard']);
        },
        (error) => {}
      );
    } else {
      Object.values(this.signInForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity( {onlySelf: true});
        }
      })
    }
    
  }
  handlePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
  }
}
