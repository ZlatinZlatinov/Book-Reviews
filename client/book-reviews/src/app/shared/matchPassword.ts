import { ValidatorFn, FormGroup } from '@angular/forms';

export function matchPasswordsValidator(pass: string, rePass: string): ValidatorFn {

    return (control) => {
        const group = control as FormGroup; 
        const pass1 = group.get(pass); 
        const pass2 = group.get(rePass);
        return pass1?.value === pass2?.value ? null : {matchPasswordsValidator: true};
    }
}