import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function registerPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const passwordControl = control?.get('password');
        const confirmPasswordControl = control?.get('confirmPassword');

        if (passwordControl && confirmPasswordControl) {
            if (passwordControl.value === '') {
                passwordControl.setErrors({required: true});
            }
            
            if (confirmPasswordControl.value === '') {
                confirmPasswordControl.setErrors({required: true});
            }

            if (confirmPasswordControl.value !== '' && confirmPasswordControl.value !== '' && passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({passwordNotMatch: true});
                passwordControl.setErrors({passwordNotMatch: true});
                console.log(passwordControl);
                console.log(confirmPasswordControl);
                return null;
            }
        }
        return null;
    }
}