import {
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { add } from 'date-fns';
import * as moment from 'moment';

const PHONE_NUMBER_MIN_LENGTH = 1;
const PHONE_NUMBER_MAX_LENGTH = 10;
const AbbreviationName_MIN_LENGTH = 3;
const FAX_NUMBER_MIN_LENGTH = 10;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_ULN_MIN_LENGTH = 8;
const TAX_NUMBER_MIN_LENGTH = 10;
const TAX_NUMBER_MAX_LENGTH = 15;
const USERNAME_LOGIN_MIN_LENGTH = 6;

export default class CustomValidator {
  static emailOrEmpty(control: AbstractControl): ValidationErrors | null {
    return control.value === '' || control.value === null
      ? null
      : Validators.email(control);
  }

  static currentDay(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    return moment(control.value).isAfter(moment(Date.now()), 'day')
      ? { currentDay: { valid: false } }
      : null;
  }

  static required(control: AbstractControl): ValidationErrors | null {
    return (Array.isArray(control.value) && !control.value.length) ||
      (!Array.isArray(control.value) &&
        (control.value === '' ||
          control.value === null ||
          (typeof control.value === 'string' && control.value.trim() === '')))
      ? {
          required: {
            valid: false,
          },
        }
      : null;
  }

  static requiredArray2(control: AbstractControl): ValidationErrors | null {
    return Array.isArray(control.value) && control.value.length === 2
      ? null
      : { required: { valid: false } };
  }

  static organizationTypeRequired(
    control: AbstractControl
  ): ValidationErrors | null {
    return (Array.isArray(control.value) && !control.value.length) ||
      (!Array.isArray(control.value) &&
        (control.value === '' ||
          control.value === null ||
          control.value.trim() === ''))
      ? {
          organizationTypeRequired: {
            valid: false,
          },
        }
      : null;
  }

  static ownershipTypeRequired(
    control: AbstractControl
  ): ValidationErrors | null {
    return (Array.isArray(control.value) && !control.value.length) ||
      (!Array.isArray(control.value) &&
        (control.value === '' ||
          control.value === null ||
          control.value.trim() === ''))
      ? {
          ownershipTypeRequired: {
            valid: false,
          },
        }
      : null;
  }

  static supplyChainTypesRequired(
    control: AbstractControl
  ): ValidationErrors | null {
    return (Array.isArray(control.value) && !control.value.length) ||
      (!Array.isArray(control.value) &&
        (control.value === '' ||
          control.value === null ||
          control.value.trim() === ''))
      ? {
          supplyChainTypesRequired: {
            valid: false,
          },
        }
      : null;
  }

  static requiredDate(control: AbstractControl): ValidationErrors | null {
    return control.value === null ||
      control.value === '' ||
      control.value === 0 ||
      control.value === undefined
      ? {
          required: {
            valid: false,
          },
        }
      : null;
  }

  static website(control: AbstractControl): ValidationErrors | null {
    const WEBSITE_REGEX =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return WEBSITE_REGEX.test(control.value) ||
      control.value === '' ||
      control.value === null
      ? null
      : {
          website: {
            valid: false,
          },
        };
  }

  static totalValue(control: AbstractControl): ValidationErrors | null {
    return control.value === '' || control.value === null || control.value > 0
      ? null
      : {
          totalValue: {
            valid: false,
          },
        };
  }

  static probability(control: AbstractControl): ValidationErrors | null {
    return control.value === '' ||
      control.value === null ||
      (control.value >= 0 && control.value <= 100)
      ? null
      : {
          probability: {
            valid: false,
          },
        };
  }

  static phoneNumber(control: AbstractControl): ValidationErrors | null {
    return CustomValidator.isNullOrEmpty(control.value) ||
      control.value.length >= PHONE_NUMBER_MIN_LENGTH || control.value.length <= PHONE_NUMBER_MAX_LENGTH
      ? null
      : {
          phoneNumber: {
            valid: false,
          },
        };
  }

  static abbreviationName(control: AbstractControl): ValidationErrors | null {
    return CustomValidator.isNullOrEmpty(control.value) ||
      control.value.length === AbbreviationName_MIN_LENGTH
      ? null
      : {
          abbreviationName: {
            valid: false,
          },
        };
  }

  static faxNumber(control: AbstractControl): ValidationErrors | null {
    return CustomValidator.isNullOrEmpty(control.value) ||
      control.value.length >= FAX_NUMBER_MIN_LENGTH
      ? null
      : {
          faxNumber: {
            valid: false,
          },
        };
  }

  static taxNumber(control: AbstractControl): ValidationErrors | null {
    return CustomValidator.isNullOrEmpty(control.value) ||
      (control.value.length >= TAX_NUMBER_MIN_LENGTH &&
        control.value.length <= TAX_NUMBER_MAX_LENGTH)
      ? null
      : {
          taxNumber: {
            valid: false,
          },
        };
  }

  static password(control: AbstractControl): ValidationErrors | null {
    return control &&
      control.value &&
      control.value.length >= PASSWORD_MIN_LENGTH
      ? null
      : {
          password: {
            valid: false,
          },
        };
  }

  static passwordULN(control: AbstractControl): ValidationErrors | null {
    const passwordReg = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
    return CustomValidator.isNullOrEmpty(control.value) ||
      !passwordReg.test(control.value)
      ? {
          password: {
            valid: false,
          },
        }
      : null;
  }

  static requiredNumber(control: AbstractControl): ValidationErrors | null {
    return CustomValidator.isNullOrEmpty(control.value) || +control.value > 0
      ? null
      : {
          requiredNumber: {
            valid: false,
          },
        };
  }

  private static isNullOrEmpty(value: any): any {
    return value === undefined || value === null || value === '';
  }

  static loginName(control: AbstractControl): ValidationErrors | null {
    return CustomValidator.isNullOrEmpty(control.value) ||
      (control.value &&
        control.value.trim().length >= USERNAME_LOGIN_MIN_LENGTH)
      ? null
      : {
          userName: {
            valid: false,
          },
        };
  }

  static loginNameFormat(control: AbstractControl): ValidationErrors | null {
    return control.value && control.value.match(/^[.a-z0-9_-]{6,100}$/)
      ? null
      : {
          userNameFormat: {
            valid: false,
          },
        };
  }

  static validateEmail(email: any): any {
    return /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
      email
    );
  }

  static email(email: AbstractControl): ValidationErrors | null {
    // tslint:disable-next-line:max-line-length
    const EMAIL_REGEX =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEX.test(email.value) ||
      email.value === '' ||
      email.value === null
      ? null
      : {
          email: {
            valid: false,
          },
        };
  }

  static maxDate(
    startDate: Date,
    fieldName1: string,
    fieldName2: string,
    periodDay = 0
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isNullOrEmpty(control.value)) {
        return null;
      }
      const mainDate = control.value.setHours(0, 0, 0, 0);
      const starDateConvert = add(startDate, { days: periodDay }).setHours(
        0,
        0,
        0,
        0
      );
      const maxDateError = `${fieldName1} phải lớn hơn hoặc bằng ${fieldName2} ${
        periodDay ? `ít nhất ${periodDay} ngày` : ''
      }`;

      // const starDateConvert = DateTimeConvertHelper.fromTimestampToDtObject(startDate.setHours(0, 0, 0, 0)).setDate(-periodDay) / 1000;
      if (mainDate >= starDateConvert) {
        return null;
      }
      return { maxDate: { maxDateError } };
    };
  }
}
