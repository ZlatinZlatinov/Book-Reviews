import { ValidatorFn, FormGroup } from '@angular/forms';

export function imageValidator(img: string): ValidatorFn {

    return (control) => {

        return String(control.value).startsWith('http://') ||
            String(control.value).startsWith('https://') ?
            null
            : { imageValidator: true };
    }
}