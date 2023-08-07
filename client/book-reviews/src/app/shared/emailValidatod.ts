import { ValidatorFn, FormGroup } from '@angular/forms';

export function emailValidator(emailValue: string): ValidatorFn {
    const regExp = new RegExp(`[a-z0-9]+@[a-z]+\.[a-z]{2,3}`);

    return (controls) => {
        const group = controls as FormGroup;
        const email = group.get(emailValue);
        const test = regExp.test(email?.value);
        
        return controls.value === "" || regExp.test(controls.value)
            ? null
            : { emailValidator: true };
    };
}
