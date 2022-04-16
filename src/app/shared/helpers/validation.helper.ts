import { FormGroup } from '@angular/forms';
import { never } from 'rxjs';

export default class ValidationHelper {
  static validationMessages = {
    required: 'Trường này là bắt buộc nhập',
    email: 'Email không đúng định dạng',
    website: 'Website không đúng định dạng',
    probability: 'Giá trị nằm trong khoảng từ 0-100',
    phoneNumber: 'Số điện thoại phải có ít nhất 10 chữ số',
    faxNumber: 'Fax phải có ít nhất 10 chữ số',
    password: 'Mật khẩu cần phải có ít nhất 6 ký tự, bao gồm ký tự chữ và số',
    taxNumber: 'Mã số thuế từ 10 đến 15 chữ số',
    userName: 'Tên đăng nhập phải có ít nhất 6 kí tự',
    userNameFormat:
      'Tên đăng nhập không đúng định dạng. Không được chứa kí tự đặc biệt',
    mustMatch: 'Mật khẩu không khớp',
    supplyChainTypesRequired: 'Bạn cần chọn ít nhất 1 loại tài khoản',
    currentDay: 'Giá trị không được lớn hơn ngày hiện tại',
    'Mask error': '',
  };

  // static getInvalidMessages(
  //   form: FormGroup,
  //   formErrors: object,
  // ): string[] {
  //   if (!form) {
  //     return null as any;
  //   }
  //   const errorMessages: string[] = [];
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
