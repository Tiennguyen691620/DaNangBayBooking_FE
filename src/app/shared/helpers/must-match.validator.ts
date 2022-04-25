import { FormGroup } from '@angular/forms';
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function ToDate(fromDate: string, toDate: string, fromDateName?: string, toDateName?: string): any {
    return (formGroup: FormGroup) => {
        // const fromDatecontrol = formGroup.controls[from];
        // const toDateControl = formGroup.controls[to];
        // if (toDateControl.errors && !toDateControl.errors.mustMatch) {
        //     // return if another validator has already found an error on the matchingControl
        //     return;
        // }
        // // set error on matchingControl if validation fails
        // if (fromDatecontrol.value > toDateControl.value) {
        //     fromDatecontrol.setErrors({ toDate: true });
        // } else {
        //     fromDatecontrol.setErrors(null);
        // }
        const fromControl = formGroup.controls[fromDate];
        const toControl = formGroup.controls[toDate];

        if (toControl.errors && !toControl.errors.toDate) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        const fromValue = fromControl.value;
        const toValue = toControl.value;
        // set error on matchingControl if validation fails
        if (fromValue && toValue && fromValue.setHours(0, 0, 0, 0) >= toValue.setHours(0, 0, 0, 0)) {
            toControl.setErrors({ toDate: { fromDateName, toDateName } });
        } else {
            toControl.setErrors(null);
        }
    }
}