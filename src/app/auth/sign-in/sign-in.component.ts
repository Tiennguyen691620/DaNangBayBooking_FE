import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { userModel } from 'src/app/shared/models/user.model';
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
    this.signInForm.valueChanges.subscribe((data) => {
      this.onFormValueChanged();
    });
  }

  onFormValueChanged(): void {
    if (this.isSubmitted) {
      this.validateForm();
    }
  }

  validateForm(): void {}

  submitForm(): void {
    // if(this.validateForm()){
    this.authService
      .login(this.signInForm.value.userName, this.signInForm.value.password)
      .subscribe(
        (res) => {
          const data = res;
          this.authService.setAuthenticationModel(data as userModel);
          this.router.navigate(['/dashboard']);
        },
        (error) => {}
      );
    // }
    //   if (this.signInForm.valid) {
    //     console.log(this.signInForm.value);
    //   } else {
    //     Object.values(this.signInForm.controls).forEach((control) => {
    //       if (control.invalid) {
    //         control.markAsDirty();
    //         control.updateValueAndValidity({ onlySelf: true });
    //       }
    //     });
    //   }
  }
  handlePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
  }
}
