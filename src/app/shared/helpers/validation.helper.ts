import { FormGroup } from '@angular/forms';



export default class ValidationHelper {
  public static validationMessages = {
    require: 'Trường này bắt buộc nhập',
    email: 'Email không đúng định dạng',
    userName: 'Tên đăng nhập có ít nhất 6 kí tự',
    password:
      'Mật khẩu phải có ít nhất 8 kí tự, trong đó có ít nhât 1 chữ hoa, 1 chữ thường và 1 chữ số',
    userNameFormat: 'Tên đăng nhập không đúng định dạng',
  };

  // static getInvalidMessages(form: FormGroup, formErrors: Record<string, any>): string[]  {
  //   if (!form) {
  //     return;
  //   }
  //   const errorMessages = [];
  //   for (const field in formErrors) {
  //     formErrors[field] = '';
  //     const control = form.get(field);
  //     if (control && !control.valid) {
  //       for (const key in control.errors) {
  //         formErrors[field] += this.validationMessages[key] + '';
  //         break;
  //       }
  //     }
  //   }

  //   for (const key in formErrors) {
  //     if (formErrors.hasOwnProperty(key) && formErrors[key].length > 0) {
  //       errorMessages.push(formErrors[key]);
  //     }
  //   }

  //   return errorMessages;
  // }


  static validateForm(form: FormGroup, formErrors: object): boolean {
    return true;
  }

  
}